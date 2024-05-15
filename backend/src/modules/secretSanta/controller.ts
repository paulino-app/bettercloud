import { messages } from '../../models/messages';
import { databaseConnection } from './../../config/connections';
import {
  Member,
  PreviousAssignment,
  UpdateGroupStateParams
} from './interfaces';

// Shuffle array using Fisher-Yates algorithm
const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; --i) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// Helper function to check if an assignment is valid
const isValidPair = (
  santaId: number,
  recipientId: number,
  memberMap: Map<number, Member>,
  previousAssignments: PreviousAssignment[]
) => {
  if (santaId === recipientId) return false;

  const santaFamilyId = memberMap.get(santaId)?.familyId ?? null;
  const recipientFamilyId = memberMap.get(recipientId)?.familyId ?? null;

  if (santaFamilyId === recipientFamilyId) {
    const sameFamilyAssignments = previousAssignments.filter(
      (assignment) =>
        (assignment.santaId === santaId &&
          assignment.recipientId === recipientId) ||
        (assignment.santaId === recipientId &&
          assignment.recipientId === santaId)
    );

    if (sameFamilyAssignments.length > 0) return false;
  }

  return true;
};

const assignPairs = (
  members: Member[],
  previousAssignments: PreviousAssignment[]
) => {
  const memberIds = members.map((member) => member.id);
  const memberMap = new Map(members.map((member) => [member.id, member]));

  let attempts: number = 0;
  const maxAttempts: number = 100;

  while (attempts < maxAttempts) {
    shuffle(memberIds);
    const pairs: { santaId: number; recipientId: number }[] = [];

    let valid: boolean = true;

    for (let i = 0; i < memberIds.length; i++) {
      const santaId = memberIds[i];
      const recipientId = memberIds[(i + 1) % memberIds.length];

      if (!isValidPair(santaId, recipientId, memberMap, previousAssignments)) {
        valid = false;
        break;
      }

      pairs.push({ santaId, recipientId });
    }

    if (valid) return pairs;

    attempts++;
  }

  throw new Error('Failed to assign Secret Santa pairs.');
};

export const assignSecretSanta = async (c: any) => {
  const { groupId } = await c.req.json();

  try {
    const group = await databaseConnection('group')
      .select('state')
      .where('id', groupId)
      .first();

    if (group?.state !== 'idle')
      return c.status(500).json({ message: 'Already assigned' });

    // Get all members of the group
    const members: Member[] = await databaseConnection('member')
      .join('group_members', 'member.id', 'group_members.memberId')
      .where({ groupId })
      .select('member.*');

    if (members.length <= 1)
      return c.status(500).json({ message: 'Already assigned' });

    const threeYearsAgo = new Date();
    threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

    const previousAssignments: PreviousAssignment[] = await databaseConnection(
      'assignments'
    )
      .where('groupId', groupId)
      .andWhere('date', '>=', threeYearsAgo.toISOString().split('T')[0])
      .select('date', 'santaId', 'recipientId');

    const pairs = assignPairs(members, previousAssignments);

    // Insert pairs into the database
    const currentDate = new Date().toISOString().split('T')[0];

    const insertData = pairs.map((pair) => ({
      date: currentDate,
      groupId: groupId,
      santaId: pair.santaId,
      recipientId: pair.recipientId
    }));

    await databaseConnection('assignments').insert(insertData);
    await updateGroupState({ groupId, newState: 'assigned' });

    return c.json({ pairs });
  } catch (error) {
    console.log(error);
    return c.status(500).json({ message: 'Error fetching data' });
  }
};

async function updateGroupState({
  groupId,
  newState
}: UpdateGroupStateParams): Promise<void> {
  try {
    await databaseConnection('group')
      .where('id', groupId)
      .update({ state: newState });
  } catch (error) {
    console.log(error);
  }
}

export const revealSecretSantaResults = async (c: any) => {
  const { groupId } = c.req.param();

  try {
    // Check if the group's state is "assigned"
    const group = await databaseConnection('group')
      .where({ id: groupId })
      .first();
    if (!group) {
      return c.json({ message: 'Group not found' }, 404);
    }

    if (group.state !== 'assigned') {
      return c.json(
        {
          message:
            'Secret Santa results cannot be revealed until the group state is "assigned"'
        },
        400
      );
    }

    const assignments = await databaseConnection('assignments')
      .where({ groupId })
      .select('santaId', 'recipientId', 'date');

    if (!assignments.length) {
      return c.json({ message: 'No assignments found for this group' }, 404);
    }

    const results = await Promise.all(
      assignments.map(async (assignment) => {
        const santa = await databaseConnection('member')
          .where({ id: assignment.santaId })
          .first();
        const recipient = await databaseConnection('member')
          .where({ id: assignment.recipientId })
          .first();
        return {
          santa: {
            id: santa.id,
            name: santa.name,
            email: santa.email,
            photo: santa.photo,
            description: santa.description,
            phone: santa.phone
          },
          recipient: {
            id: recipient.id,
            name: recipient.name,
            email: recipient.email,
            photo: recipient.photo,
            description: recipient.description,
            phone: recipient.phone
          },
          date: assignment.date
        };
      })
    );

    return c.json(results);
  } catch (error) {
    console.log(error);
    return c.json(messages.error.fetch, 500);
  }
};

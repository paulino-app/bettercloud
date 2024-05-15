import { databaseConnection } from '../../config/connections';
import { messages } from '../../models/messages';

export const getAllGroups = async (c: any) => {
  try {
    const groups = await databaseConnection('group').select('*');

    const groupsWithMembers = await Promise.all(
      groups.map(async (group) => {
        const members = await databaseConnection('group_members')
          .join('member', 'group_members.memberId', 'member.id')
          .where('group_members.groupId', group.id)
          .select(
            'member.id',
            'member.name',
            'member.email',
            'member.photo',
            'member.description',
            'member.phone'
          );
        return {
          ...group,
          memberCount: members.length,
          members: members
        };
      })
    );

    return c.json(groupsWithMembers);
  } catch (error) {
    console.log(error);
    return c.json(messages.error.fetch, 500);
  }
};

export const getGroupById = async (c: any) => {
  const { groupId } = c.req.param();
  try {
    const group = await databaseConnection('group')
      .where({ id: groupId })
      .first();
    if (!group) {
      return c.json({ message: 'Group not found' }, 404);
    }

    const members = await databaseConnection('group_members')
      .join('member', 'group_members.memberId', 'member.id')
      .where('group_members.groupId', groupId)
      .select(
        'member.id',
        'member.name',
        'member.email',
        'member.photo',
        'member.description',
        'member.phone'
      );

    const groupWithMembers = {
      ...group,
      memberCount: members.length,
      members: members
    };

    return c.json(groupWithMembers);
  } catch (error) {
    console.log(error);
    return c.json(messages.error.fetch, 500);
  }
};

export const getGroupBySession = async (c: any) => {
  const { session } = c.req.param();
  try {
    const group = await databaseConnection('group').where({ session }).first();
    if (!group) {
      return c.json({ message: 'Group not found' }, 404);
    }

    const members = await databaseConnection('group_members')
      .join('member', 'group_members.memberId', 'member.id')
      .where('group_members.groupId', group.id)
      .select(
        'member.id',
        'member.name',
        'member.email',
        'member.photo',
        'member.description',
        'member.phone',
        'member.color'
      );

    const groupWithMembers = {
      ...group,
      memberCount: members.length,
      members: members
    };

    return c.json(groupWithMembers);
  } catch (error) {
    console.log(error);
    return c.json(messages.error.fetch, 500);
  }
};

export const createGroup = async (c: any) => {
  const { name, organizerId, moneyLimit, theme } = await c.req.json();
  const session = generateSessionId(); // fix
  const date = new Date();
  try {
    const [id] = await databaseConnection('group').insert({
      name,
      session,
      organizerId,
      state: 'idle',
      moneyLimit,
      theme,
      date
    });

    //add the organizer as a participant in the group
    await databaseConnection('group_members').insert({
      memberId: organizerId,
      groupId: id
    });

    return c.json({
      id,
      name,
      session,
      organizerId,
      state: 'idle',
      moneyLimit,
      theme,
      date
    });
  } catch (error) {
    console.log(error);
    return c.json(messages.error.fetch, 500);
  }
};

export const addMemberToGroup = async (c: any) => {
  const { memberId, groupId } = await c.req.json();
  try {
    const existingMember = await databaseConnection('group_members')
      .where({ memberId, groupId })
      .first();
    if (existingMember) {
      return c.json({ message: 'Member is already part of the group' }, 400);
    }
    const [id] = await databaseConnection('group_members').insert({
      memberId,
      groupId
    });
    return c.json({ id, memberId, groupId });
  } catch (error) {
    console.log(error);
    return c.json(messages.error.fetch, 500);
  }
};

export const deleteMemberFromGroup = async (c: any) => {
  const { memberId, groupId } = await c.req.json();
  try {
    await databaseConnection('group_members')
      .where({ memberId, groupId })
      .del();
    return c.json({ message: 'Member removed from group' });
  } catch (error) {
    console.log(error);
    return c.json(messages.error.fetch, 500);
  }
};

export const deleteGroup = async (c: any) => {
  const { id } = await c.req.json();
  try {
    await databaseConnection('group').where({ id }).del();
    return c.json({ message: 'Group deleted' });
  } catch (error) {
    return c.json(messages.error.fetch, 500);
  }
};

// Helper function to generate a unique session ID
const generateSessionId = () => {
  return Math.random().toString(36).substr(2, 9);
};

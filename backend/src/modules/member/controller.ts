import { databaseConnection } from '../../config/connections';
import { messages } from '../../models/messages';

export const getAllMembers = async (c: any) => {
  try {
    const members = await databaseConnection('member').select('*');
    return c.json(members);
  } catch (error) {
    console.log(error);
    return c.json(messages.error.fetch, 500);
  }
};

export const getMembersByFamilyId = async (c: any) => {
  const { familyId } = c.req.param();
  try {
    const members = await databaseConnection('member').where({ familyId });
    return c.json(members);
  } catch (error) {
    console.log(error);
    return c.json(messages.error.fetch, 500);
  }
};

export const getMembersByGroupId = async (c: any) => {
  const { groupId } = c.req.param();
  try {
    const members = await databaseConnection('member')
      .join('group_members', 'member.id', 'group_members.memberId')
      .where({ groupId })
      .select('member.*');
    return c.json(members);
  } catch (error) {
    console.log(error);
    return c.json(messages.error.fetch, 500);
  }
};

export const getMembersNotInGroup = async (c: any) => {
  const { groupId } = c.req.param();
  try {
    // Get members who are in the group
    const membersInGroup = await databaseConnection('group_members')
      .where({ groupId })
      .select('memberId');

    // extract member IDs
    const memberIdsInGroup = membersInGroup.map((member) => member.memberId);

    // get members who are not in the group
    const membersNotInGroup = await databaseConnection('member')
      .whereNotIn('id', memberIdsInGroup)
      .select('*');

    return c.json(membersNotInGroup);
  } catch (error) {
    console.log(error);
    return c.json(messages.error.fetch, 500);
  }
};

export const getMembersByGroupSession = async (c: any) => {
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

    return c.json(members);
  } catch (error) {
    console.log(error);
    return c.json(messages.error.fetch, 500);
  }
};

const getRandomColor = () => {
  const colors = [
    '#76CE8E',
    '#4B90B7',
    '#3C5CBA',
    '#03A7C0',
    '#A9DCDF',
    '#4BB7A0',
    '#8A3CBA',
    '#9276CE'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const createMember = async (c: any) => {
  const { familyId, photo, name, description, email, phone } =
    await c.req.json();
  const color = getRandomColor();
  try {
    const [id] = await databaseConnection('member').insert({
      familyId,
      photo,
      name,
      description,
      email,
      phone,
      color
    });
    return c.json({
      id,
      familyId,
      photo,
      name,
      description,
      email,
      phone,
      color
    });
  } catch (error) {
    console.log(error);
    return c.json(messages.error.fetch, 500);
  }
};

export const updateMember = async (c: any) => {
  const { id, familyId, photo, name, description, email, phone } =
    await c.req.json();
  try {
    await databaseConnection('member')
      .where({ id })
      .update({ familyId, photo, name, description, email, phone });
    return c.json({ message: 'Member updated' });
  } catch (error) {
    console.log(error);
    return c.json(messages.error.fetch, 500);
  }
};

export const deleteMember = async (c: any) => {
  const { id } = await c.req.json();
  try {
    await databaseConnection('member').where({ id }).del();
    return c.json({ message: 'Member deleted' });
  } catch (error) {
    return c.json(messages.error.fetch, 500);
  }
};

export const createMemberAndAddToGroup = async (c: any) => {
  const { familyId, groupId, photo, name, description, email, phone } =
    await c.req.json();
  const color = getRandomColor();
  try {
    // Create a new member
    const [id] = await databaseConnection('member').insert({
      familyId,
      photo,
      name,
      description,
      email,
      phone,
      color
    });

    // add a new mbrer
    await databaseConnection('group_members').insert({
      memberId: id,
      groupId: groupId
    });

    return c.json({
      id,
      familyId,
      photo,
      name,
      description,
      email,
      phone,
      color,
      groupId
    });
  } catch (error) {
    console.log(error);
    return c.json(messages.error.fetch, 500);
  }
};

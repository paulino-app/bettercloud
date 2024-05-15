// controllers/familyController.js
import { databaseConnection } from '../../config/connections';
import { messages } from '../../models/messages';

export const getAllFamilies = async (c: any) => {
  try {
    const families = await databaseConnection('family').select('*');
    return c.json(families);
  } catch (error) {
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

export const createFamily = async (c: any) => {
  const { name } = await c.req.json();
  const color = getRandomColor();
  try {
    const [id] = await databaseConnection('family').insert({ name, color });
    return c.json({ id, name, color });
  } catch (error) {
    console.log(error);
    return c.json(messages.error.fetch, 500);
  }
};

export const deleteFamily = async (c: any) => {
  const { id } = await c.req.json();
  try {
    await databaseConnection('family').where({ id }).del();
    return c.json({ message: 'Family deleted' });
  } catch (error) {
    return c.json(messages.error.fetch, 500);
  }
};

export const updateFamilyName = async (c: any) => {
  const { id, name } = await c.req.json();
  try {
    await databaseConnection('family').where({ id }).update({ name });
    return c.json({ message: 'Family updated' });
  } catch (error) {
    return c.json(messages.error.fetch, 500);
  }
};

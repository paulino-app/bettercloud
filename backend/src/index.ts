import { Hono } from 'hono';
import { cors } from 'hono/cors';

import {
  createFamily,
  deleteFamily,
  getAllFamilies,
  updateFamilyName
} from './modules/family/controllers';
import {
  createMember,
  createMemberAndAddToGroup,
  deleteMember,
  getAllMembers,
  getMembersByFamilyId,
  getMembersByGroupId,
  getMembersByGroupSession,
  getMembersNotInGroup,
  updateMember
} from './modules/member/controller';
import {
  addMemberToGroup,
  createGroup,
  deleteGroup,
  deleteMemberFromGroup,
  getAllGroups,
  getGroupById,
  getGroupBySession
} from './modules/group/controller';
import {
  assignSecretSanta,
  revealSecretSantaResults
} from './modules/secretSanta/controller';

const app = new Hono();

app.use(cors());

app.get('/', (c) => {
  return c.text('Hello BetterCloud!');
});

// Family Routes
app.get('/family', getAllFamilies);
app.post('/family', createFamily);
app.delete('/family', deleteFamily);
app.put('/family', updateFamilyName);

// Group routes
app.get('/group', getAllGroups);
app.get('/group/:groupId', getGroupById);
app.get('/group/session/:session', getGroupBySession);
app.post('/group', createGroup);
app.post('/group/member', addMemberToGroup);
app.delete('/group/member', deleteMemberFromGroup);
app.delete('/group', deleteGroup);

// Member routes
app.get('/member', getAllMembers);
app.get('/member/family/:familyId', getMembersByFamilyId);
app.get('/member/group/:groupId', getMembersByGroupId);
app.get('/member/group/session/:session', getMembersByGroupSession);
app.post('/member', createMember);
app.post('/member/group', createMemberAndAddToGroup);
app.put('/member', updateMember);
app.get('/group/:groupId/members-not-in-group', getMembersNotInGroup);
app.delete('/member', deleteMember);

// Secret Santa routes
app.get('/reveal-results/:groupId', revealSecretSantaResults);
app.post('/assign-santa', assignSecretSanta);

export default {
  port: 3010,
  fetch: app.fetch
};

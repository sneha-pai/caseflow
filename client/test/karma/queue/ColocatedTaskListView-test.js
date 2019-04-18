import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import ColocatedTaskListView from '../../../app/queue/ColocatedTaskListView';
import { createStore, applyMiddleware } from 'redux';
import moment from 'moment';
import thunk from 'redux-thunk';
import CO_LOCATED_ADMIN_ACTIONS from '../../../constants/CO_LOCATED_ADMIN_ACTIONS.json';
import rootReducer from '../../../app/queue/reducers';
import { onReceiveQueue, receiveNewDocumentsForTask, errorFetchingDocumentCount, setAppealDocCount }
  from '../../../app/queue/QueueActions';
import { setUserCssId } from '../../../app/queue/uiReducer/uiActions';
import { BrowserRouter } from 'react-router-dom';

describe('ColocatedTaskListView', () => {
  let wrapperColocatedTaskListView = null;

  const getWrapperColocatedTaskListView = (store) => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <ColocatedTaskListView />
        </BrowserRouter>
      </Provider>
    );

    return wrapper;
  };

  let momentNow = null;

  before(() => {
    momentNow = moment.now;
    moment.now = () => 100000;
  });

  after(() => {
    moment.now = momentNow;
  });

  afterEach(() => {
    if (wrapperColocatedTaskListView) {
      wrapperColocatedTaskListView.unmount();
      wrapperColocatedTaskListView = null;
    }
  });

  const getAmaTaskTemplate = () => ({
    uniqueId: '1',
    type: 'GenericTask',
    isLegacy: false,
    appealType: 'Appeal',
    addedByCssId: null,
    appealId: 5,
    externalAppealId: '3bd1567a-4f07-473c-aefc-3738a6cf58fe',
    assignedOn: moment().subtract(47, 'hours').
      format(),
    closedAt: null,
    assignedTo: {
      cssId: 'BVALSPORER',
      name: 'Judge with cases',
      type: 'User',
      isOrganization: true,
      id: 7
    },
    assignedBy: {
      firstName: 'Attorney',
      lastName: 'cases',
      cssId: 'BVASCASPER1',
      pgId: 1
    },
    taskId: '8',
    label: 'new_rep_arguments',
    documentId: null,
    workProduct: null,
    previousTaskAssignedOn: null,
    placedOnHoldAt: null,
    onHoldDuration: null,
    decisionPreparedBy: null,
    availableActions: [],
    hideFromQueueTableView: false,
    hideFromCaseTimeline: false,
    hideFromTaskSnapshot: false,
    closestRegionalOffice: ''
  });

  const appealTemplate = {
    id: 5,
    type: 'Appeal',
    isLegacyAppeal: false,
    externalId: '3bd1567a-4f07-473c-aefc-3738a6cf58fe',
    docketName: null,
    caseType: 'Original',
    isAdvancedOnDocket: false,
    issueCount: 2,
    docketNumber: 'Missing Docket Number',
    assignedJudge: null,
    assignedAttorney: null,
    veteranFullName: 'Andrew Van Buren',
    veteranFileNumber: '152003980',
    isPaperCase: null
  };

  const amaTaskWith = ({ cssIdAssignee, ...rest }) => {
    const amaTaskTemplate = getAmaTaskTemplate();

    return ({
      ...amaTaskTemplate,
      ...rest,
      assignedTo: {
        ...amaTaskTemplate.assignedTo,
        cssId: cssIdAssignee
      }
    });
  };

  const getStore = () => createStore(rootReducer, applyMiddleware(thunk));

  /* eslint-disable no-unused-expressions */
  describe('Assigned tab', () => {
    it('shows only new tasks and tasks with a completed hold', () => {
      const daysOnHold = 31;
      const taskNewAssigned = amaTaskWith({ id: '1',
        cssIdAssignee: 'BVALSPORER' });
      const taskUnassigned = amaTaskWith({ id: '5',
        cssIdAssignee: 'NOTBVALSPORER' });
      const completedHoldTask = amaTaskWith({
        id: '6',
        cssIdAssignee: 'BVALSPORER',
        assignedOn: moment().subtract(daysOnHold + 0.5, 'days'),
        placedOnHoldAt: moment().subtract(daysOnHold, 'days'),
        onHoldDuration: daysOnHold - 1
      });
      const appeal = appealTemplate;

      const tasks = {};
      const amaTasks = {
        [taskNewAssigned.id]: taskNewAssigned,
        [taskUnassigned.id]: taskUnassigned,
        [completedHoldTask.id]: completedHoldTask
      };
      const appeals = {
        [appeal.id]: appeal
      };

      const store = getStore();

      store.dispatch(onReceiveQueue({ tasks,
        amaTasks,
        appeals }));
      store.dispatch(setUserCssId(taskNewAssigned.assignedTo.cssId));

      const wrapper = getWrapperColocatedTaskListView(store);

      const cells = wrapper.find('td');

      expect(cells).to.have.length(14);
      const wrappers = [];

      for (let i = 0; i < cells.length / 2; i++) {
        wrappers.push(cells.at(i));
      }
      const [hearings, caseDetails, columnTasks, types, docketNumber, daysWaiting, documents] = wrappers;
      const task = taskNewAssigned;

      expect(hearings.text()).to.include('');
      expect(caseDetails.text()).to.include(appeal.veteranFullName);
      expect(caseDetails.text()).to.include(appeal.veteranFullName);
      expect(caseDetails.text()).to.include(appeal.veteranFileNumber);
      expect(columnTasks.text()).to.include(CO_LOCATED_ADMIN_ACTIONS[task.label]);
      expect(types.text()).to.include(appeal.caseType);
      expect(docketNumber.text()).to.include(appeal.docketNumber);
      expect(daysWaiting.text()).to.equal('1');
      expect(documents.html()).to.include(`/reader/appeal/${task.externalAppealId}/documents`);
      const ids = ['3575931', '3619838', '3625593', '3626186', 'e22b7880-84a3-4f23-b5ba-0b9837eca4e8',
        '8d8b533e-3a45-42d9-92c2-a736a436dc67', 'fff266d5-2952-4baa-b8fe-abf41cc33eda',
        '80949be2-2a7b-419c-83a1-abfbe4d2aa56', 'a814cfbc-c6ef-4835-998b-db5cbb882c0a',
        'fff266d5-2952-4baa-b8fe-abf41cc33eda', '80949be2-2a7b-419c-83a1-abfbe4d2aa56',
        'a814cfbc-c6ef-4835-998b-db5cbb882c0a', '2096907', '2226048', '2249056', '2306397', '2657227',
        'f31dc143-768c-45e1-b2ba-19af4df25be9', 'ab78acb4-6335-4579-8679-71f8871740b4',
        '5def02ad-e376-43be-be59-a31f768b6073'];

      store.dispatch(errorFetchingDocumentCount(ids));
      expect(wrapper.find('td').at(6).
        text()).to.include('View  docs');
      const mockResponse = {
        'a814cfbc-c6ef-4835-998b-db5cbb882c0a': {
          count: 1,
          status: 200,
          error: null
        },
        '8d8b533e-3a45-42d9-92c2-a736a436dc67': {
          count: 1,
          status: 200,
          error: null
        },
        '80949be2-2a7b-419c-83a1-abfbe4d2aa56': {
          count: 0,
          status: 200,
          error: null
        },
        'fff266d5-2952-4baa-b8fe-abf41cc33eda': {
          count: 1,
          status: 200,
          error: null
        }
      };

      store.dispatch(setAppealDocCount(mockResponse));
      expect(wrapper.find('td').at(5).
        text()).to.include('1');

      const onHoldDaysWaiting = cells.at(12);

      expect(onHoldDaysWaiting.text()).to.equal(daysOnHold.toString());
      expect(onHoldDaysWaiting.find('.cf-red-text').length).to.eq(1);
      expect(onHoldDaysWaiting.find('.cf-continuous-progress-bar-warning').length).to.eq(1);
    });
  });

  describe('On hold tab', () => {
    it('shows only on-hold tasks', () => {
      const task = amaTaskWith({
        id: '1',
        cssIdAssignee: 'BVALSPORER',
        placedOnHoldAt: moment().subtract(2, 'days'),
        onHoldDuration: 30
      });
      const taskNotAssigned = amaTaskWith({
        ...task,
        id: '5',
        cssIdAssignee: 'NOTBVALSPORER'
      });
      const taskWithNewDocs = {
        ...task,
        id: '4',
        externalAppealId: '44'
      };
      const taskNew = amaTaskWith({
        id: '6',
        cssIdAssignee: task.assignedTo.cssId
      });
      const appeal = appealTemplate;
      const appealWithNewDocs = {
        ...appeal,
        id: '6',
        externalId: taskWithNewDocs.externalAppealId
      };

      const tasks = {};
      const amaTasks = {
        [task.id]: task,
        [taskNotAssigned.id]: taskNotAssigned,
        [taskWithNewDocs.id]: taskWithNewDocs,
        [taskNew.id]: taskNew
      };
      const appeals = {
        [appeal.id]: appeal,
        [appealWithNewDocs.id]: appealWithNewDocs
      };
      const store = getStore();

      store.dispatch(onReceiveQueue({ tasks,
        amaTasks,
        appeals }));
      store.dispatch(setUserCssId(task.assignedTo.cssId));
      store.dispatch(receiveNewDocumentsForTask({
        taskId: taskWithNewDocs.taskId,
        newDocuments: [{}]
      }));

      const wrapper = getWrapperColocatedTaskListView(store);

      wrapper.find('[aria-label="On hold (2) tab window"]').simulate('click');

      expect(wrapper.find('[aria-label="On hold (2) tab window"] #NEW').length).to.eq(0);

      const cells = wrapper.find('td');

      expect(cells).to.have.length(14);
      const wrappers = [];

      for (let i = 0; i < cells.length / 2; i++) {
        wrappers.push(cells.at(i));
      }
      const [hearings, caseDetails, columnTasks, types, docketNumber, daysOnHold, documents] = wrappers;

      expect(hearings.text()).to.include('');
      expect(caseDetails.text()).to.include(appeal.veteranFullName);
      expect(caseDetails.text()).to.include(appeal.veteranFileNumber);
      expect(columnTasks.text()).to.include(CO_LOCATED_ADMIN_ACTIONS[task.label]);
      expect(types.text()).to.include(appeal.caseType);
      expect(docketNumber.text()).to.include(appeal.docketNumber);
      expect(daysOnHold.text()).to.equal('1 of 30');
      expect(daysOnHold.find('.cf-continuous-progress-bar').length).to.eq(1);
      expect(documents.html()).to.include(`/reader/appeal/${task.externalAppealId}/documents`);
    });
  });
});
/* eslint-enable no-unused-expressions */

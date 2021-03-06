import React from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../../components/Button';

import { onUpdateDocketHearing } from '../actions';
import HearingText from './DailyDocketRowDisplayText';
import {
  DispositionDropdown, TranscriptRequestedCheckbox, HearingDetailsLink,
  AodDropdown, AodReasonDropdown, HearingPrepWorkSheetLink, StaticRegionalOffice,
  NotesField, HearingLocationDropdown, StaticHearingDay, TimeRadioButtons,
  Waive90DayHoldCheckbox
} from './DailyDocketRowInputs';

const SaveButton = ({ hearing, cancelUpdate, saveHearing }) => {
  return <div {...css({
    content: ' ',
    clear: 'both',
    display: 'block'
  })}>
    <Button
      styling={css({ float: 'left' })}
      linkStyling
      onClick={cancelUpdate}>
      Cancel
    </Button>
    <Button
      styling={css({ float: 'right' })}
      disabled={hearing.dateEdited && !hearing.dispositionEdited}
      onClick={saveHearing}>
      Save
    </Button>
  </div>;
};

const inputSpacing = css({
  '& > div:not(:first-child)': {
    marginTop: '25px'
  }
});

class HearingActions extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      initialState: {
        ...props.hearing,
        editedTime: null
      },
      edited: false
    };
  }

  update = (values) => {
    this.props.update(values);
    this.setState({ edited: true });
  }

  cancelUpdate = () => {
    this.props.update(this.state.initialState);
    this.setState({ edited: false });
  }

  saveHearing = () => {
    this.props.saveHearing(this.props.hearingId);
    setTimeout(() => {
      this.setState({
        initialState: { ...this.props.hearing },
        edited: false
      });
    }, 0);
  }

  getInputProps = () => {
    const { hearing, readOnly } = this.props;

    return {
      hearing,
      readOnly,
      update: this.update
    };
  }

  defaultRightInputs = () => {
    const { hearing, regionalOffice } = this.props;
    const inputProps = this.getInputProps();

    return <React.Fragment>
      <StaticRegionalOffice hearing={hearing} />
      <HearingLocationDropdown {...inputProps} regionalOffice={regionalOffice} />
      <StaticHearingDay hearing={hearing} />
      <TimeRadioButtons {...inputProps} regionalOffice={regionalOffice} />
    </React.Fragment>;
  }

  judgeRightInputs = () => {
    const { hearing } = this.props;
    const inputProps = this.getInputProps();

    return <React.Fragment>
      <HearingPrepWorkSheetLink hearing={hearing} />
      <AodDropdown {...inputProps} />
      <AodReasonDropdown {...inputProps} />
    </React.Fragment>;
  }

  getRightColumn = () => {
    const inputs = this.props.user.userRoleHearingPrep ? this.judgeRightInputs() : this.defaultRightInputs();

    return <div {...inputSpacing}>
      {inputs}
      {this.state.edited &&
        <SaveButton
          hearing={this.props.hearing}
          cancelUpdate={this.cancelUpdate}
          saveHearing={this.saveHearing} />}
    </div>;
  }

  getLeftColumn = () => {
    const { hearing, user, readOnly, openDispositionModal } = this.props;

    const inputProps = {
      hearing,
      readOnly,
      update: this.update
    };

    return <div {...inputSpacing}>
      <DispositionDropdown {...inputProps}
        cancelUpdate={this.cancelUpdate}
        saveHearing={this.saveHearing}
        openDispositionModal={openDispositionModal} />
      {(user.userRoleHearingPrep && hearing.docketName === 'hearing') &&
        <Waive90DayHoldCheckbox {...inputProps} />}
      <TranscriptRequestedCheckbox {...inputProps} />
      {(user.userRoleAssign && !user.userRoleHearingPrep) && <HearingDetailsLink hearing={hearing} />}
      <NotesField {...inputProps} readOnly={user.userRoleVso} />
    </div>;
  }

  render () {
    const { hearing, user, index, readOnly } = this.props;

    return <React.Fragment>
      <div>
        <HearingText
          readOnly={readOnly}
          update={this.update}
          hearing={hearing}
          user={user}
          index={index} />
      </div><div>
        {this.getLeftColumn()}
        {this.getRightColumn()}
      </div>
    </React.Fragment>;
  }
}

const mapStateToProps = (state, props) => ({
  hearing: props.hearingId ? state.hearingSchedule.hearings[props.hearingId] : {}
});

const mapDispatchToProps = (dispatch, props) => bindActionCreators({
  update: (values) => onUpdateDocketHearing(props.hearingId, values)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HearingActions);

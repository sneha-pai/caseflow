import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { loadAppealDocCount, setAppealDocCount, errorFetchingDocumentCount } from './QueueActions';

import { css } from 'glamor';
import { COLORS } from '../constants/AppConstants';

const documentCountStyling = css({
  color: COLORS.GREY
});

class AppealDocumentCount extends React.PureComponent {
  render = () => {
    const {
      docCountsByAppealId,
      loadingText,
      externalId
    } = this.props;
    const isLoadingOrError = loadingText && (docCountsByAppealId.loading || docCountsByAppealId.error);

    if (!_.isEmpty(docCountsByAppealId)) {
      if (isLoadingOrError) {
        return docCountsByAppealId.error || <span {...documentCountStyling}>Loading number of docs...</span>;
      }

      return docCountsByAppealId[externalId];
    }

    return null;
  }
}

AppealDocumentCount.propTypes = {
  appeal: PropTypes.object.isRequired,
  loadingText: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
  const externalId = ownProps.appeal.externalId;

  return {
    externalId,
    docCountsByAppealId: state.queue.docCountsByAppealId
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadAppealDocCount,
  setAppealDocCount,
  errorFetchingDocumentCount
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppealDocumentCount);

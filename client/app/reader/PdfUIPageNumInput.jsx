import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { jumpToPage, resetJumpToPage, updatePageNumberInStore } from '../reader/PdfViewer/PdfViewerActions';
import { onScrollToComment } from '../reader/Pdf/PdfActions';
import { isValidWholeNumber } from './utils';
import TextField from '../components/TextField';
import _ from 'lodash';

const ENTER_KEY = 'Enter';
const RADIX = 10;

export class PdfUIPageNumInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1
    };
  }

  componentWillUpdate = (nextProps) => {
    console.log('component is updatin', nextProps.pdfInputPageNumber);
    console.log(this.state.pageNumber, 'the page number', nextProps.pageNumber, nextProps.pdfInputPageNumber);
    // console.log('before current page', nextProps.currentPage, this.props.currentPage);
    // console.log(nextProps.pdfInputPageNumber, 'the input number after current page');
    if (nextProps.pdfInputPageNumber !== this.props.pdfInputPageNumber) {
      console.log('setting the jump to comment pagenumber');
      this.setJumpToCommentPageNumber(nextProps.pdfInputPageNumber);
    }
    if (nextProps.currentPage !== this.props.currentPage) {
      this.setPageNumber(nextProps.currentPage);
    }
  }

  setPageNumber = (pageNumber) => {
    this.setState({
      pageNumber
    }, () => {
      this.props.resetJumpToPage();
      // console.log(this.props, 'da props to input');
      // this.props.jumpToPage(this.pageNumber, this.props.doc.id);
      // this.props.jumpToPage;
      _.delay(this.props.jumpToPage, 500, pageNumber, this.props.docId);
      this.props.updatePageNumberInStore(pageNumber);
    });
  }

  setJumpToCommentPageNumber = (pageNumber) => {
    this.setState({
      pageNumber
    }, () => {
      this.props.onScrollToComment(null);
      this.props.updatePageNumberInStore(pageNumber);
    });
  }

  handleKeyPress = (event) => {
    if (event.key === ENTER_KEY) {
      const pageNumber = event.target.value;
      const newPageNumber = this.validatePageNum(pageNumber);

      console.log('the new page number!', newPageNumber);
      this.setPageNumber(newPageNumber);

    }
  }

  validatePageNum = (pageNumber) => {
    let pageNum = parseInt(pageNumber, RADIX);

    if (!pageNum || !isValidWholeNumber(pageNum) ||
      (pageNum < 1 || pageNum > this.props.numPages)) {
      return this.props.currentPage;
    }

    return pageNum;
  }

  render() {
    return (
      <div style={{ display: 'inline-block' }}>
        <TextField
          maxLength="4"
          name="page-progress-indicator-input"
          label="Page"
          onChange={this.setPageNumber}
          onKeyPress={this.handleKeyPress}
          value={this.state.pageNumber}
          required={false}
          className={['page-progress-indicator-input']}
        />
      </div>);
  }
}

PdfUIPageNumInput.propTypes = {
  currentPage: PropTypes.number,
  numPages: PropTypes.number,
  jumpToPage: PropTypes.func,
  docId: PropTypes.number,
  pdfInputPageNumber: PropTypes.number
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  jumpToPage,
  resetJumpToPage,
  onScrollToComment,
  updatePageNumberInStore
}, dispatch);

const mapStateToProps = (state) => {
  return {
    ..._.pick(state.pdf, 'pdfInputPageNumber')
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(PdfUIPageNumInput);

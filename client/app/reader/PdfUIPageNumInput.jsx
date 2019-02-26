import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { jumpToPage, updatePageNumberInStore } from '../reader/PdfViewer/PdfViewerActions';
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
    console.log(nextProps.currentPage, 'next props current page');
    console.log(nextProps.pageNumber, 'next props redux page number');
    if (nextProps.currentPage !== this.props.currentPage) {
      // if (nextProps.scale === this.props.scale) {
      this.setPageNumber(nextProps.currentPage);
      // }
    }
  }

  // shouldComponentUpdate = (nextProps) => {
  //   if (nextProps.scale !== this.props.scale) {
  //     console.log('blocking state update');

  //     return false;
  //   }

  //   return true;
  // }

  setPageNumber = (pageNumber) => {
    console.log('am i changing');
    this.setState({
      pageNumber
    });
    this.props.updatePageNumberInStore(pageNumber);
  }

  handleKeyPress = (event) => {
    if (event.key === ENTER_KEY) {
      const pageNumber = event.target.value;
      const newPageNumber = this.validatePageNum(pageNumber);

      this.setPageNumber(newPageNumber);
      // don't jump to the page unless it's a valid page entry
      // and it's not the current page
      if (this.props.currentPage !== newPageNumber) {
        this.props.jumpToPage(newPageNumber, this.props.docId);
      }
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
          onChange={_.throttle(this.setPageNumber, 500)}
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
  docId: PropTypes.number
};
const mapStateToProps = (state) => {

  return {
    pageNumber: state.pdfViewer.pageNumber,
    scale: state.pdfViewer.scale
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  jumpToPage,
  updatePageNumberInStore
}, dispatch);

export default connect(
  mapStateToProps, mapDispatchToProps
)(PdfUIPageNumInput);

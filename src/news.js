import React from 'react';
import { connect } from "react-redux";
import { newsListAction } from './features/redux/action/action'
import SelectField from 'react-select'
import Button from '@material-ui/core/Button';
import FilterIcon from '@material-ui/icons/Tune';
import RemoveIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

class News extends React.Component {
  state = {
    select: null,
    date: undefined,
    site: null,
    filterShow: false,
    search: null
  }
  componentDidMount() {
    this.props.dispatch(newsListAction())
  }

  handleFilter = () => {
    this.setState({
      filterShow: true
    })
  }
  handleSearch = (selectedOption) => {
    this.setState({
      search: selectedOption
    })
  }
  handleRedirect = (id) => {
    this.props.history.push(`/${id}`)
  }
  handleChange = (selectedOption) => {
    this.setState({
      select: selectedOption
    })
  }
  handleDateChange = (selectedOption) => {
    this.setState({
      date: selectedOption
    })
  }
  handleSiteChange = (selectedOption) => {
    this.setState({
      site: selectedOption
    })
  }
  handleClose = () => {
    this.setState({
      filterShow: false
    })
  }
  render() {

    const newsValue = this.props.newsList && this.props.newsList.newsListDATA && this.props.newsList.newsListDATA.data
    const newsList = ((newsValue && newsValue.articles) || []).filter(t => this.state.search && this.state.search.value ? (this.state.search.value=== t.author || this.state.search.value === (new Date(t.publishedAt).toLocaleDateString()) || this.state.search.value ===t.url) : this.state.select && this.state.select.value ? t.author === this.state.select.value :
      this.state.date && this.state.date.value ? this.state.date.value === ((new Date(t.publishedAt).toLocaleDateString())) : this.state.site && this.state.site.value ? this.state.site.value === t.url : t).map((item, index) => {
        const date = new Date(item.publishedAt)
        return (
          <div className="flex ma2" key={index} onClick={() => this.handleRedirect(item.title)}>
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 mw5 center" style={{ maxWidth: "322px" }}>
              <img src={item.urlToImage} className="db w-100 br2 br--top" alt="Photo of a kitten looking menacing." style={{width:'100%',height:'50%',objectFit:'cover'}}/>
              <div className="pa2 ph3-ns pb3-ns" >
                <div className="dt w-100 mt1">
                  <div className="dt">
                    <p className="mv0">{date.toLocaleDateString()}</p>
                  </div>
                  <div className="dt">
                    <h1 className="f5 f4-ns mv0">{item.title}</h1>
                  </div>
                  <div className="dt-row">
                    <em className="mt2" style={{ wordBreak: 'break-all' }}>{item.author}</em>
                  </div>
                </div>
                <a href={item.url} target='_blank' className="lh-copy mt2 mid-gray" style={{ wordBreak: 'break-all' }}>{item.url}</a>
              </div>
            </article>
          </div>
        )
      })

    const authorDropDown = ((newsValue && newsValue.articles) || []).map((item, index) => {

      return (
        {
          value: item.author,
          label: item.author
        }
      )
    })

    const dateDropDown = ((newsValue && newsValue.articles) || []).map((item, index) => {
      const date = new Date(item.publishedAt)
      return (
        {
          value: date.toLocaleDateString(),
          label: date.toLocaleDateString()
        }
      )
    })

    const siteDropDown = ((newsValue && newsValue.articles) || []).map((item, index) => {
      return (
        {
          value: item.url,
          label: item.url
        }
      )
    })

    const dropDown = authorDropDown.concat(siteDropDown,dateDropDown)

    const searchPlacehoder = <span><SearchIcon />  search</span>
    const searchField = <SelectField
      placeholder={searchPlacehoder}
      value={this.state.search}
      onChange={this.handleSearch}
      options={dropDown}
      isSearchable
      isClearable
      textFieldProps={{
        InputLabelProps: {
          id: "search",
          shrink: true,
        }
      }}
    />

    const authorValue = <SelectField
      placeholder="author"
      value={this.state.select}
      onChange={this.handleChange}
      options={authorDropDown}
      isSearchable
      isClearable
      textFieldProps={{
        label: 'Search by author name',
        InputLabelProps: {
          id: "author",
          shrink: true,
        }
      }}
    />

    const dateField = <SelectField
      placeholder="Published Date"
      value={this.state.date}
      onChange={this.handleDateChange}
      options={dateDropDown}
      isSearchable
      isClearable
      textFieldProps={{
        label: 'Search by published date',
        InputLabelProps: {
          shrink: true,
          url: "date"
        }
      }}
    />


    const site = <SelectField
      placeholder="site"
      value={this.state.site}
      onChange={this.handleSiteChange}
      options={siteDropDown}
      isSearchable
      isClearable
      textFieldProps={{
        label: 'Search by site url',
        InputLabelProps: {
          shrink: true,
          id: "url",
        }
      }}
    />

    const filterValue = this.state.filterShow ? <div className="w-100 ph5">
      <div className="flex w-80 relative justify-end"><RemoveIcon onClick={this.handleClose} /></div>
      <div className="flex flex-row">
        <div className="flex flex-column w-25 pa2">{authorValue}</div>
        <div className="flex flex-column w-25 pa2">{dateField}</div>
        <div className="flex flex-column w-25 pa2">{site}</div>
      </div>
    </div> : ""

    return (
      <div className="w-100 ph4">
        <div className="flex flex-row ma5">
          <div className="flex flex-column w-90 pr3">{searchField}</div>
          <div className="flex flex-column w-10">
            <Button variant="contained" color="secondary" onClick={this.handleFilter}>
              <FilterIcon />
              Filter
            </Button>
          </div>
        </div>
        {filterValue}
        <div className="flex ma4 flex-row">
          <div className="flex flex-row flex-wrap pt2 w-100 pl3">

            {newsList}
          </div>
        </div>
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return {
    newsList: state
  }
}

export default connect(mapStatetoProps)(News);
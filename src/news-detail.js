import * as React from 'react';
import { newsDeatilAction } from './features/redux/action/action-detail'
import BackIcon from '@material-ui/icons/ArrowBack';
import { connect } from 'react-redux'

class NewsDetail extends React.Component {

    componentDidMount() {
        this.props.dispatch(newsDeatilAction(this.props.match.params.id))
    }

    handleBack = () => {
        this.props.history.push('/')
    }
    render() {
 
        const newsDetailValue = this.props.newsDetail && this.props.newsDetail.newsDetail && this.props.newsDetail.newsDetail.data;
        const title = newsDetailValue ? newsDetailValue.title : "";
        const imageUrl = newsDetailValue ? newsDetailValue.urlToImage : "";
        const author = newsDetailValue ? newsDetailValue.author : "author name";
        const content = newsDetailValue ? newsDetailValue.content : "";
        const description = newsDetailValue ? newsDetailValue.description : "";
        const siteName = newsDetailValue ? newsDetailValue.source && newsDetailValue.source.name : "Site Name";
        const site = newsDetailValue ? newsDetailValue.url : "Site Url";
        const date = newsDetailValue? (new Date(newsDetailValue.publishedAt)).toLocaleDateString():"Date";

        return (
            <div className="cf w-100">
                <div className="ph5 pt5"><BackIcon onClick={this.handleBack}/></div>
                <article className="ph5 pt3 pb3">
                    <h1 className="f2">{title}</h1>
                    <p><em>{date}/{author}/{siteName}/{site}</em></p>
                    <div className="w-100">
                        <img src={imageUrl} className="w-100 f5 ma2" alt="Photo of outer space" />                        
                        <h3>{content}</h3>
                        <p className="lh-copy"> {description} </p>
                        <span>author : </span>
                        <strong>{author}</strong>
                    </div>
                </article>
            </div>
        );
    }
}

function mapStatetoProps(state) {
    return {
        newsDetail: state
    }
}
export default connect(mapStatetoProps)(NewsDetail);
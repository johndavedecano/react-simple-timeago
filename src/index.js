import React, {Component} from 'react';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

class TimeAgo extends Component {
    
    isMounted = false;

    state = {
        lastUpdatedAt: null
    };

    componentDidMount() {
        
        this.isMounted = true;
        
        if (this.props.isLive) {
            this.updateTime();
        }
    }

    componentWillUnmount() {
        this.isMounted = false;
        clearTimeout(this.timeout);
    }

    updateTime = () => {
        const interval = this.getInterval();
        if (interval > 0) {
            this.timeout = setTimeout(this.updateTime, interval);
            if (this.isMounted) {
                this.setState({
                    lastUpdatedAt: new Date().getTime()
                });
            }
        }
    }

    getDifference() {
        return differenceInSeconds(new Date(), this.props.date);
    }

    getInterval() {
        const diff = this.getDifference();
        if (diff < 3600) {
            return 60000;
        } else if (diff >= 3600 && diff <= 86400) {
            return 3600000;
        } else {
            return 0;
        }
    }

    getParsedDate() {
        const diff = this.getDifference();
        if (diff < 30) {
            return 'now';
        } else {
            const options = {
                addSuffix: this.props.addSuffix,
                includeSeconds: this.props.includeSeconds,
            };
            return distanceInWordsToNow(this.props.date, options);
        }
    }

    render() {
        return React.createElement(
            this.props.element,
            {className: (this.props.className) ? this.props.className : ''},
            this.getParsedDate()
        );
    }
}

TimeAgo.defaultProps = {
    element: 'p',
    date: new Date(),
    className: undefined,
    isLive: true,
    addSuffix: true,
    includeSeconds: true,
};

const allowedDateTypes = [
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.instanceOf(Date)
];

TimeAgo.propTypes = {
    element: React.PropTypes.string,
    date: React.PropTypes.oneOfType(allowedDateTypes),
    className: React.PropTypes.string,
    isLive: React.PropTypes.bool,
    addSuffix: React.PropTypes.bool,
    includeSeconds: React.PropTypes.bool
};

export default TimeAgo;

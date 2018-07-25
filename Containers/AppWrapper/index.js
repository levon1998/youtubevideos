import {getVideos} from './actions';
import {connect} from 'react-redux';
import styles from '../../Styles/Styles';
import React, {Component} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import {generateApiUrl} from '../../Services/GenerateApiUrl'

class AuthWrapper extends Component {
    constructor () {
        super();
        this.state = {
            videos: [],
            youtubeParams: {
                'chart': 'mostPopular',
                'regionCode': 'US',
                'part': 'snippet',
                'key': 'AIzaSyD50zBPkbOMbp3dVVjAB_DmFVDQt0bGdQE',
            }
        }
    }

    componentDidMount () {
        const url = generateApiUrl(this.state.youtubeParams);
        this.props.getVideos(url);
    }

    componentWillReceiveProps(nextProps){
        this.setState({ videos: nextProps.auth.videoList });
    };

    render () {
        return (
            <FlatList
                data={ this.state.videos.items }
                renderItem={
                    ({item}) => {
                        const image = item.snippet.thumbnails.default
                        return (
                            <View style={styles.item}>
                                <Image
                                    style={{width: image.width, height: image.height}}
                                    source={{uri: image.url}}
                                />
                                <Text>{item.snippet.title}</Text>
                                <Text style={{color: 'blue'}}>Author: {item.snippet.channelTitle}</Text>
                            </View>
                        )
                    }

                }
                keyExtractor={(item, index) => index}
            />
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => {
    return {
        getVideos: (data) => dispatch(getVideos(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);
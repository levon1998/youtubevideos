import {connect} from 'react-redux';
import React, {Component} from 'react';
import styles from '../../Styles/Styles';
import {getVideos, search} from './actions';
import {generateApiUrl} from '../../Services/GenerateApiUrl'
import {
    Modal,
    FlatList,
    Image,
    Text,
    TextInput,
    View,
    ActivityIndicator,
    TouchableOpacity,
    WebView
} from 'react-native';

class AuthWrapper extends Component {
    constructor () {
        super();
        this.state = {
            videos: [],
            videoId: '',
            searchText: "",
            modalVisible: false,
            youtubeParams: {
                'part': 'snippet',
                'regionCode': 'US',
                'chart': 'mostPopular',
                'key': 'AIzaSyD50zBPkbOMbp3dVVjAB_DmFVDQt0bGdQE',
            },

        }
    }

    componentDidMount () {
        const url = generateApiUrl(this.state.youtubeParams, 'videos');
        this.props.getVideos(url);
    }

    search (searchText) {
        const youtubeSearchParams = {
            'q': searchText,
            'part': 'snippet',
            'maxResults': '25',
            'key': 'AIzaSyD50zBPkbOMbp3dVVjAB_DmFVDQt0bGdQE'
        }
        const url = generateApiUrl(youtubeSearchParams, 'search');
        this.props.search(url);
        this.setState({searchText})
    }

    openVideo (visible, videoId) {
        this.setState({modalVisible: visible, videoId});
    }

    componentWillReceiveProps(nextProps){
        this.setState({ videos: nextProps.auth.videoList });
    };

    render () {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.openVideo(!this.state.modalVisible)}>
                    <View style={{ height: 300 }}>
                        <WebView
                            style={ styles.WebViewContainer }
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            source={{uri: `https://www.youtube.com/embed/${this.state.videoId}` }}
                        />
                    </View>
                </Modal>

                <TextInput
                    style={{height: 40, borderColor: 'grey', borderWidth: 2, margin: 10, padding: 10, borderRadius:20}}
                    onChangeText={(searchText) => this.search(searchText)}
                    value={this.state.searchText}
                    placeholder="Search"
                />
                {
                    (this.props.auth.loading === true) ?
                        <ActivityIndicator size="large" color="#0000ff" />
                    :
                        <FlatList
                            data={ this.state.videos.items }
                            renderItem={
                                ({item}) => {
                                    const image = item.snippet.thumbnails.default
                                    return (
                                        <TouchableOpacity onPress={() => this.openVideo(!this.state.modalVisible, item.id)}>
                                            <View style={styles.item}>
                                                <Image
                                                    style={{width: image.width, height: image.height}}
                                                    source={{uri: image.url}}
                                                />
                                                <Text>{item.snippet.title}</Text>
                                                <Text style={{color: 'blue'}}>Author: {item.snippet.channelTitle}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }

                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                }
            </View>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => {
    return {
        getVideos: (data) => dispatch(getVideos(data)),
        search: (data) => dispatch(search(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);
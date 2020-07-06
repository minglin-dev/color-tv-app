import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Avatar, Image } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

const keyExtractor = (item, index) => index.toString()

const renderItem = ({photo, onPreview}) => {
    return (
    <View 
        style={{ flex: 1, flexDirection: 'column', margin: 1 }}
        >
            <TouchableOpacity onPress={(e) => onPreview(photo)} >
                <Image style={styles.imageThumbnail} source={{ uri: photo.urls.thumb }} />
            </TouchableOpacity>
    </View>
)};

const UserDetail = ({ navigation }) => {
    const user = navigation.getParam('user', {});

    const handlePreview = (item) => {
        const curIndex = user.photos.findIndex(photo => photo.id === item.id)
        navigation.navigate('photoDetailScreen', {images: user.photos, curIndex });
    };

    return (
        <View style={styles.container}>
            <View style={styles.userInfoContainer}>
                <View style={styles.avatarContainer}>
                    <Avatar
                        rounded
                        source={{
                            uri: user && user.profile_image && user.profile_image.medium,
                        }}
                        size='large'
                    />
                </View>
                <View style={styles.userDescriptionContainer}>
                    <Text style={styles.usernameText}>{user.name}</Text>
                    <Text style={styles.bioText}>{user.bio}</Text>
                </View>
            </View>
            <View style={styles.photoContainer}>
                <FlatList
                    keyExtractor={keyExtractor}
                    data={user.photos}
                    numColumns={3}
                    renderItem={(photo) => renderItem({photo: photo.item, onPreview: handlePreview})}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    userInfoContainer: {
        flex: 0.15,
        flexDirection: 'row',
        marginVertical: 10
    },
    photoContainer: {
        flex: 0.85,
        
    },
    avatarContainer: {
        flex: 0.4,
        alignItems: 'center'
    },
    userDescriptionContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingRight: 5
    },
    usernameText: {
        fontSize: 24
    },
    bioText: {
        fontSize: 12
    },
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
    },
});

export default UserDetail;
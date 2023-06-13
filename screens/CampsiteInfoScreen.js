import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import RenderCampsite from "../features/campsites/RenderCampsite";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import { useState } from "react";
import { Modal, Button, Input } from "react-native";
import { Card, Icon, Rating } from "react-native-elements";
import { postComment } from "../features/comments/commentsSlice";

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState("");
    const [text, setText] = useState("");

    const handleSubmit = () => {
        const newComment = {
            author,
            rating,
            text,
            campsiteId: campsite.id,
        };
        dispatch(postComment(newComment));
        setShowModal(!showModal);
    };

    const resetForm = () => {
        setRating(5);
        setAuthor("");
        setText("");
    };

    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Rating
                    readonly
                    startingValue={item.rating}
                    imageSize={10}
                    style={{ alignItems: "flex-start", paddingVertical: "5%" }}
                />
                <Text style={{ fontSize: 12 }}>
                    {`-- ${item.author}, ${item.date}`}
                </Text>
            </View>
        );
    };

    return (
        <View>
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)}
            >
                <View style={styles.modal}>
                    <Rating
                        showRating
                        startingValue={rating}
                        imageSize={40}
                        onFinishRating={(rating) => setRating(rating)}
                        style={{ paddingVertical: 10 }}
                    />
                    <Input
                        placeholder="Author"
                        leftIcon={{ type: "font-awesome", name: "user-o" }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={(author) => setAuthor(author)}
                        value={author}
                    />
                    <Input
                        placeholder="Comment"
                        leftIcon={{ type: "font-awesome", name: "comment-o" }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={(text) => setText(text)}
                        value={text}
                    />
                    <View style={{ margin: 10 }}>
                        <Button
                            title="Submit"
                            buttonStyle={{ backgroundColor: "#5637DD" }} // note the change here
                            onPress={() => {
                                handleSubmit();
                                resetForm();
                            }}
                        />
                    </View>

                    <View style={{ margin: 10 }}>
                        <Button
                            title="Cancel"
                            onPress={() => {
                                setShowModal(!showModal);
                                resetForm();
                            }}
                        />
                    </View>
                </View>
            </Modal>
            <FlatList
                data={comments.commentsArray.filter(
                    (comment) => comment.campsiteId === campsite.id
                )}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                    marginHorizontal: 20,
                    paddingVertical: 20,
                }}
                ListHeaderComponent={
                    <>
                        <RenderCampsite
                            campsite={campsite}
                            isFavorite={favorites.includes(campsite.id)}
                            markFavorite={() =>
                                dispatch(toggleFavorite(campsite.id))
                            }
                        />
                        <Text style={styles.commentsTitle}>Comments</Text>
                        <View style={{ margin: 10 }}>
                            <Button
                                title="Add Comment"
                                onPress={() => setShowModal(!showModal)}
                            />
                        </View>
                    </>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: "center",
        backgroundColor: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        color: "#43484D",
        padding: 10,
        paddingTop: 30,
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    modal: {
        justifyContent: "center",
        margin: 20,
    },
});

export default CampsiteInfoScreen;

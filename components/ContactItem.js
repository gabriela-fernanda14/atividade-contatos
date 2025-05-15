import React from "react";
import { View, StyleSheet } from "react-native";
import { List, Avatar, IconButton } from "react-native-paper";

export default function ContactItem({ name, phone, category, onEdit, onDelete  }) {
    const initial = name ? name[0].toUpperCase() : "?";

    return (
        <List.Item
            title={name} 
            description={`${phone} • ${category}`} 
            left={() => (
                <Avatar.Text size={40} label={initial} style={{ backgroundColor: "#B39DDB" }} />
            )}
            right={() => (
                <View style={styles.actions}>
                    <IconButton icon="pencil" size={20} onPress={onEdit} />
                    <IconButton icon="delete" size={20} onPress={onDelete} />
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    actions: {
        flexDirection: "row",
        alignItems: "center",
    },
});
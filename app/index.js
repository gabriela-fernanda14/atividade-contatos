import React, { useState } from 'react';
import {
    View,
    FlatList,
    Alert,
    StyleSheet
} from "react-native";
import { FAB, Portal, TextInput, Button, List, Dialog } from 'react-native-paper';
import ContactItem from '../components/ContactItem';

export default function HomeScreen() {
    const [contacts, setContacts] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        category: "",
    });
    const [editIndex, setEditIndex] = useState(null);

    function saveContact() {
    const { name, phone, category } = formData;
    if (!name || !phone || !category) return;

    const updatedContacts = [...contacts];
    if (editIndex === null) {
      updatedContacts.push({ name, phone, category });
    } else {
      updatedContacts[editIndex] = { name, phone, category };
    }

    setContacts(updatedContacts);
    resetForm();
  }

  function resetForm() {
    setFormData({ name: "", phone: "", category: "" });
    setEditIndex(null);
    setModalVisible(false);
  }

  // Função para confirmar exclusão do contato
  function confirmDelete(index) {
    Alert.alert("Excluir contato?", `Remover "${contacts[index].name}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          const updated = [...contacts];
          updated.splice(index, 1); // Remove a tarefa diretamente do array
          setContacts(updated); // Atualiza o estado com a lista modificada
        },
      },
    ]);
  }

  // Função para abrir o modal em modo de edição
  function openEditModal(index) {
    setFormData(contacts[index]); // Carrega o texto da tarefa no campo de edição
    setEditIndex(index); // Define o índice da tarefa a ser editada
    setModalVisible(true); // Abre o modal
  }

  return (
    <View style={styles.container}>


      {/* Lista de tarefas */}
      <FlatList
        data={contacts}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item, index }) => (
          <ContactItem
            name={item.name}       // Passando nome corretamente
            phone={item.phone}     // Passando telefone corretamente
            category={item.category} // Passando categoria corretamente
            onEdit={() => openEditModal(index)} // Função para editar
            onDelete={() => confirmDelete(index)} // Função para deletar
          />
        )}
        ListEmptyComponent={<List.Item title="Nenhum contato ainda." />}
      />


      <Portal>
        <Dialog visible={modalVisible} onDismiss={resetForm}>
          <Dialog.Title>{editIndex === null ? "Novo Contato" : "Editar Contato"}</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Nome"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              style={styles.input}
            />
            <TextInput
              label="Telefone"
              value={formData.phone}
              keyboardType="phone-pad"
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              style={styles.input}
            />
            <TextInput
              label="Categoria (trabalho, pessoal, família...)"
              value={formData.category}
              onChangeText={(text) => setFormData({ ...formData, category: text })}
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={resetForm}>Cancelar</Button>
            <Button onPress={saveContact}>{editIndex === null ? "Adicionar" : "Salvar"}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        icon="plus"
        label="Adicionar Contato"
        onPress={() => setModalVisible(true)}
        style={styles.fab}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginBottom: 8,
  },
  fab: {
    position: "absolute",
    bottom: 16,
    alignSelf: "center",
    backgroundColor: "#B39DDB",
  },
});

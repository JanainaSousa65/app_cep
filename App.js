import  React, {useState,useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Keyboard} from 'react-native';
import api from './src/services/api';

export default function App() {
  const [cep, setCep] = useState('');
  const inputRef = useRef(null); //hook para referenciar o input de texto
  const [cepUser, setCepUser] = useState(null);

  function limpar (){
    setCep('');
    inputRef.current.focus(); //para focar o campo de texto após a exlusão do valor
    setCepUser(null); //limpa os dados da pesquisa anterior
  }

  async function buscar(){
    if(cep== ''){
      alert("Digite o CEP!"); //Verificar se o cep foi preenchido ou não
      setCep('');
      return;// se estiver vazio ele retorna para a função
    }
    try{
      const response = await api.get(`/ws/${cep}/json/`);//endereço da API externa para pegar os dados
      console.log(response.data);
      setCepUser(response.data);
      Keyboard.dismiss(); // fecha o teclado virtual quando pressiona o botão buscar
    }
    catch(error){
      console.log('ERROR: '+error);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.texto}>Digite o CEP desejado</Text>

        <TextInput
        style={styles.input}
        type = 'text'
        placeholder='ex:50000000'
        value = {String(cep)}
        onChange={(evento) => setCep(evento.nativeEvent.text)}
        keyboardAppearance='dark'
        keyboardType='numeric'
        ref={inputRef} //usado para referenciar elementos no html ou em componentes react nativos.
       /> 

      </View>

      <View style={styles.areaBtn}>
      
      <TouchableOpacity style={[styles.botao, {backgroundColor: '#f00000'}]}
        onPress={buscar} //vai ser executada quando clicar
      >

        <Text style={styles.botaoText}>Buscar</Text>

      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.botao,{backgroundColor: '#1d75cd'}]}
      onPress={limpar} //vai ser executada quando clicar
      >

        <Text style={styles.botaoText}>Limpar</Text>

      </TouchableOpacity>

      </View>

      { cepUser &&
        <View style={styles.resultado}>
          <Text style={styles.itemText}> CEP: {cepUser.cep} </Text>
          <Text style={styles.itemText}> Logradouro: {cepUser.logradouro} </Text>
          <Text style={styles.itemText}> Bairro: {cepUser.bairro} </Text>
          <Text style={styles.itemText}> Cidade: {cepUser.localidade} </Text>
          <Text style={styles.itemText}> Estado: {cepUser.uf} </Text>
        </View>
      }
  
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  texto: {
    textAlign: 'center',
    fontSize:50, 
    marginTop: 23, 
    marginBottom: 20,
    fontWeight: 'bold'
  },
  input: {
    width: '90%',
    height: 60,
    borderRadius: 8,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#ddd",
    borderColor: "#ddd",
    paddingHorizontal: 15,
    fontSize:50, 
  },
  botao: {
    height: 50,
    justifyContent: 'center',
    padding: 15, 
    borderRadius: 5,
    backgroundColor: '#f00000',
  },
  botaoText:{
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold'
  },
  areaBtn:{
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },

});

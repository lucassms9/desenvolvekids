# desenvolve-kids

App Desenvolvido sob demanda usando React Native, React Navigation, Redux, Redux Sagas, Redux Sauce, React Native Elements e outras libs.

Desenvolvido por: Lucas Santos Mendonça da Silva

contato: lucassms9@hotmail.com


Deploy usando codepsuh

appcenter codepush release-react -a D-D-tech/Desenvolve-Kids -d Production

keytool -exportcert -alias desenvolvekids-alias -keystore android/app/desenvolvekids-key.keystore | openssl sha1 -binary | openssl base64

keytool -list -v \
-alias desenvolvekids-alias -keystore android/app/desenvolvekids-key.keystore

keytool -list -v -keystore android/app/desenvolvekids-key.keystore -alias desenvolvekids-alias


Modulo dependente 

detalhamento: 

- No menu secundário no app, criar modulo de dependentes; 

Criar flag na tabela de usuarios (bool dependente 1/0) 

- O perfil dependente deve vir de uma API (pai,mae,tio,tia,etc); 

- A regra inicial e o usuário só poder criar 1 dependente; 


Modulo galeria 

detalhamento: 
exibir todas imagens de comprovações realizadas nas atividades,  
com opções de compartilhamento nas redes sociais 

melhorias
- colocar validador de data nos forms

'@types/jest/package.json'
'@types/react-navigation/package.json'
'@types/react-redux/package.json'
'@types/react-test-renderer/package.json'
'react-native-typescript-transformer/package.json'
'ts-jest/package.json'
'typescript/package.json'
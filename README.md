# TokenRF

#### Configuração do ambiente.
[SDK Android] (https://spring.io/guides/gs/android/)

#### Instalação do ionic
`npm install -g cordova ionic`

##### Criação do projeto
```
PROJETO=tokenrf
ionic start ${PROJETO} blank
cd ${PROJETO}
```

##### Plataformas
```
ionic platform add ios
ionic platform add android
```

##### Plugins
`cordova plugin add https://github.com/phonegap-build/PushPlugin.git`

##### Debug: Live Reload, Print app console, Print dev server
`ionic run android -l -c -s`

##### Build
`ionic build android`

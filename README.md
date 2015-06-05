# TokenRF

#### Configuração do ambiente.
[SDK Android] (https://spring.io/guides/gs/android/)

#### Instalação do cordova.
`sudo npm install -g cordova`

#### Criar app.
```
cordova create TokenRF net.ssapia.tokenrf TokenRF
cd TokenRF && cordova platform add android
```

#### Adicionar plugin device.
  `cordova plugin add cordova-plugin-device`

#### Configurar plugin.
```
  (in ./platforms/android/res/xml/config.xml)
  <feature name="Device">
      <param name="android-package" value="org.apache.cordova.Device" />
  </feature>

  (in ./platforms/android/AndroidManifest.xml)
  <uses-permission android:name="android.permission.READ_PHONE_STATE" />
```
#### Compile
`cordova build`

#### Compile and deploy
`cordova run android`


Fontes:
- (https://cordova.apache.org/docs/en/3.0.0/guide_cli_index.md.html)
- (https://cordova.apache.org/docs/en/3.0.0/cordova_device_device.md.html)

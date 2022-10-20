# Holder Wallet

A lightweight holder wallet mobile app based on [React Native](https://reactnative.dev/).

It interacts with [verifiable-data-registry-server](https://github.com/yepengding/verifiable-data-registry-server) to
obtain new decentralized identifiers and issuer cloud to obtain new verifiable credentials.

## Platform

- Android
- iOS

## Development

1. Install dependencies

```shell
npm install
```

2. Install [Expo Go](https://expo.dev/client) app on a mobile device
3. Duplicate `.env.example` as `.env` and configure environment variables.

> Normally, the address of the Android Emulator is `10.0.2.2` according to [Set up Android Emulator networking
](https://developer.android.com/studio/run/emulator-networking.html)

4. Run project

```shell
npm run start
```

4. Scan the QR code to run app preview on the mobile device

---

# References

- [verifiable-data-registry-server](https://github.com/yepengding/verifiable-data-registry-server)
- [React Native](https://reactnative.dev/)

# Bitbar Wunderground

###### A weather plugin for the fabulous [Bitbar](https://github.com/matryer/bitbar) or [Argos](https://github.com/p-e-w/argos) programs

### Setup

1. Install [Node](https://nodejs.org/)
2. Clone this repo and move it's contents into your [Bitbar plugins directory](https://github.com/matryer/bitbar#installing-plugins) or [`~/.config/argos`](https://github.com/p-e-w/argos#installation)
3. Run `npm install` to get the [`Wundergrounded`](https://github.com/patrickvalle/wundergrounded) and [`ipapi.co`](https://github.com/ipapi-co/ipapi-nodejs) modules
4. Edit [line 11](wunderground.30m.js#L11) to have your [Wunderground API Key](https://www.wunderground.com/weather/api)
5. Edit [lines 12 and 13](wunderground.30m.js#L12-L13) with your (optional) hard-coded location, and your preferred units
6. Make `wunderground.30m.js` executable with `chmod +x wunderground.30m.js`

You're done!

### Updating

When updates are released here on Github, simply pull the latest files down with `git pull`, move them to the right spot, run `npm update`, and check your settings on [lines 11-13](wunderground.30m.js#L11-L13)

- - -

This is my first Node project. I took it on to dip my toes in it, so I'm sure there are improvements that could be made. Thanks to:
- [matryer](https://github.com/matryer) for [Bitbar](https://github.com/matryer/bitbar)
- [p-e-w](https://github.com/p-e-w) for [Argos](https://github.com/p-e-w/argos)
- [patrickvalle](https://github.com/patrickvalle) for [Wundergrounded](https://github.com/patrickvalle/wundergrounded)
- [ipapi-co](https://github.com/ipapi-co) for [ipapi-nodejs](https://github.com/ipapi-co/ipapi-nodejs)

Feel free to take a look at the source and adapt as you please.

This source is licensed as follows:

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)

<span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Wunderground Bitbar</span> is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).

- - -

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/white_img.png)](https://buymeacoff.ee/leoherzog)

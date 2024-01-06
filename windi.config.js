// @ts-check - enable TS check for js file
import { defineConfig } from 'windicss/helpers'
import windiRtl from 'windicss-rtl'

export default defineConfig({
  plugins: [windiRtl],
  theme: {
    extend: {
      fontFamily: {
        Knewave: 'Knewave',
        roboto: 'roboto'
      }
    }
  }
})

// 1. import `createSystem` and `defaultConfig`
import { createSystem, defaultConfig } from '@chakra-ui/react'

// 2. Create the system with config
const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {},
    },
  },
})

export default system
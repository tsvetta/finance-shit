console.log('test')


import { run } from 'eff-core'
import EffDOM from 'eff-dom'
import { makeDomDriver } from 'eff-dom/client'

function App() {
    return <div>Hello world</div>
}

run(<App />, {
    DOM: makeDomDriver('#app')
})

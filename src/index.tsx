import { run } from 'eff-core'
import EffDOM, { DOMSource } from 'eff-dom'
import { makeDOMDriver } from 'eff-dom/client'
import { makeHTTPDriver, HTTPSource } from 'eff-http'

interface Sources {
    DOM: DOMSource,
    HTTP: HTTPSource,
}

function App(_props: {}, sources: Sources) {
    const githubApiListReq = sources.HTTP.request('https://api.github.com/')

    const loadButtonRef = sources.DOM.createRef()
    const load$ = loadButtonRef.events('click')
        .map(() => githubApiListReq.makeRequest())
        .startWith(undefined)

    return (
        <div>
            <button ref={loadButtonRef}>Load</button>
            {load$}
            {githubApiListReq.response$
                .startWith(undefined)
                .map(x => <code><pre>{JSON.stringify(x, null, 2)}</pre></code>)}
        </div>
    )
}

run(<App />, {
    DOM: makeDOMDriver('#app'),
    HTTP: makeHTTPDriver({ fetch: fetch.bind(window) }),
})

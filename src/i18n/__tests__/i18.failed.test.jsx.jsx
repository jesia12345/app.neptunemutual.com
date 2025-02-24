import { screen, waitFor } from '@testing-library/react'
import { LanguageProvider } from '../i18n'
import { Trans } from '@lingui/macro'
import { initiateTest, mockFn } from '@/utils/unit-tests/test-mockup-fn'

jest.mock('../dynamic-activate', () => ({
  dynamicActivate: jest.fn(() => Promise.reject(new Error('Error in dynamic-activate')))
}))

function WithProvider () {
  return (
    <LanguageProvider>
      <Trans>Connect wallet</Trans>
    </LanguageProvider>
  )
}

describe('LanguageProvider', () => {
  const { initialRender } = initiateTest(WithProvider, {})

  const languagechange = jest.fn(() => {})

  test('Should render LanguageProvider', async () => {
    mockFn.useRouter()

    initialRender()

    await waitFor(() => {
      const connectWallet = screen.getByText('Connect wallet')

      expect(connectWallet).toBeInTheDocument()

      window.addEventListener('languagechange', languagechange)

      window.dispatchEvent(new Event('languagechange'))

      expect(languagechange).toBeCalled()
    })
  })
})

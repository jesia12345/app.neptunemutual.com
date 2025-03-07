import { initiateTest, mockFn } from '@/utils/unit-tests/test-mockup-fn'
import { screen } from '@testing-library/react'

jest.mock('@/common/ComingSoon', () => ({
  ComingSoon: () => <div data-testid='coming-soon' />
}))

describe('ReportingNewCoverPage test', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    mockFn.useRouter()
    process.env = { ...OLD_ENV, NEXT_PUBLIC_ENABLE_V2: 'false' }
    const ReportingNewCoverPage =
      require('@/pages/covers/[coverId]/products/[productId]/new-report').default
    const { initialRender } = initiateTest(ReportingNewCoverPage)

    initialRender()
  })

  test('Should display coming soon', () => {
    const comingSoon = screen.getByTestId('coming-soon')
    expect(comingSoon).toBeInTheDocument()
  })
})

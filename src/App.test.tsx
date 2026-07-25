import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { RESOURCE_CATEGORIES } from './types/resource'

describe('App', () => {
  it('renders the Resource Centre heading', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /ha \| wisdom wellbeing resource centre/i,
      }),
    ).toBeInTheDocument()
  })

  it('announces the initial number of displayed resources', () => {
    render(<App />)

    expect(screen.getByRole('status')).toHaveTextContent(
      '6 resources displayed',
    )
  })

  it('renders all category headings in the expected order', () => {
    render(<App />)

    const categoryHeadings = screen.getAllByRole('heading', { level: 2 })

    expect(categoryHeadings.map((heading) => heading.textContent)).toEqual(
      RESOURCE_CATEGORIES,
    )
  })

  it('shows resources beneath the correct category sections', () => {
    render(<App />)

    const podcastsSection = screen.getByRole('region', { name: /podcasts/i })
    const articlesSection = screen.getByRole('region', { name: /articles/i })

    expect(podcastsSection).toHaveTextContent('Mindful Moments')
    expect(podcastsSection).not.toHaveTextContent('The Science of Sleep')
    expect(articlesSection).toHaveTextContent('The Science of Sleep')
    expect(articlesSection).not.toHaveTextContent('Mindful Moments')
  })

  it('renders card content with image text, tags, and duration labels', () => {
    render(<App />)

    expect(
      screen.getByRole('img', { name: /mindful moments thumbnail/i }),
    ).toBeInTheDocument()

    const mindfulMomentsTags = screen.getByRole('list', {
      name: /mindful moments tags/i,
    })

    expect(
      within(mindfulMomentsTags).getByText('mindfulness'),
    ).toBeInTheDocument()
    expect(screen.getByText('25 min watch')).toBeInTheDocument()
    expect(screen.getByText('8 min read')).toBeInTheDocument()
  })

  it('opens a resource details dialog with complete metadata', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(
      screen.getByRole('button', {
        name: /view details for mindful moments/i,
      }),
    )

    const dialog = screen.getByRole('dialog', { name: /mindful moments/i })

    expect(dialog).toHaveTextContent(
      'A calming podcast focused on mindfulness techniques for daily life.',
    )
    expect(dialog).toHaveTextContent('Podcasts')
    expect(dialog).toHaveTextContent('25 min watch')
    expect(dialog).toHaveTextContent('10 July 2025')
    expect(
      within(dialog).getByRole('img', {
        name: /mindful moments full image/i,
      }),
    ).toBeInTheDocument()

    const tags = within(dialog).getByRole('list', {
      name: /mindful moments details tags/i,
    })
    expect(within(tags).getByText('mindfulness')).toBeInTheDocument()
  })

  it('uses the fallback illustration for broken card and details images', async () => {
    const user = userEvent.setup()
    render(<App />)
    const cardImage = screen.getByRole('img', {
      name: /mindful moments thumbnail/i,
    })

    fireEvent.error(cardImage)
    expect(cardImage).toHaveAttribute('src', '/resource-placeholder.svg')

    await user.click(
      screen.getByRole('button', {
        name: /view details for mindful moments/i,
      }),
    )
    const detailsImage = within(screen.getByRole('dialog')).getByRole('img', {
      name: /mindful moments full image/i,
    })

    fireEvent.error(detailsImage)
    expect(detailsImage).toHaveAttribute('src', '/resource-placeholder.svg')
  })

  it('locks background scrolling while details are open and restores it', async () => {
    const user = userEvent.setup()
    document.body.style.overflow = 'scroll'
    render(<App />)

    await user.click(
      screen.getByRole('button', {
        name: /view details for mindful moments/i,
      }),
    )
    expect(document.body.style.overflow).toBe('hidden')

    await user.click(screen.getByRole('button', { name: /close/i }))
    expect(document.body.style.overflow).toBe('scroll')

    document.body.style.overflow = ''
  })

  it('closes details with the visible button and restores card focus', async () => {
    const user = userEvent.setup()
    render(<App />)
    const card = screen.getByRole('button', {
      name: /view details for mindful moments/i,
    })

    await user.click(card)
    const closeButton = screen.getByRole('button', { name: /close/i })

    expect(closeButton).toHaveFocus()
    await user.click(closeButton)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(card).toHaveFocus()
  })

  it('closes details with Escape', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(
      screen.getByRole('button', {
        name: /view details for mindful moments/i,
      }),
    )
    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes details when the backdrop is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    const card = screen.getByRole('button', {
      name: /view details for mindful moments/i,
    })

    await user.click(card)
    const dialog = screen.getByRole('dialog', { name: /mindful moments/i })
    const backdrop = dialog.parentElement

    expect(backdrop).not.toBeNull()
    await user.click(backdrop as HTMLElement)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(card).toHaveFocus()
  })

  it('keeps details open when the dialog itself is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(
      screen.getByRole('button', {
        name: /view details for mindful moments/i,
      }),
    )
    const dialog = screen.getByRole('dialog', { name: /mindful moments/i })

    await user.click(dialog)

    expect(dialog).toBeInTheDocument()
  })

  it('allows a keyboard user to open a resource card', async () => {
    const user = userEvent.setup()
    render(<App />)
    const card = screen.getByRole('button', {
      name: /view details for mindful moments/i,
    })

    card.focus()
    await user.keyboard('{Enter}')

    expect(
      screen.getByRole('dialog', { name: /mindful moments/i }),
    ).toBeInTheDocument()
  })

  it('filters by title while preserving the matching category group', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(
      screen.getByRole('searchbox', { name: /find a resource/i }),
      'science',
    )

    expect(screen.getByText('The Science of Sleep')).toBeInTheDocument()
    expect(screen.queryByText('Mindful Moments')).not.toBeInTheDocument()
    expect(
      screen.getByRole('region', { name: /articles/i }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('region', { name: /podcasts/i }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('1 resource displayed')
  })

  it('filters tags case-insensitively and trims surrounding whitespace', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(
      screen.getByRole('searchbox', { name: /find a resource/i }),
      '  SLEEP  ',
    )

    expect(screen.getByText('The Science of Sleep')).toBeInTheDocument()
    expect(
      screen.getByText('Guided Meditation for Stress Relief'),
    ).toBeInTheDocument()
    expect(screen.queryByText('Mindful Moments')).not.toBeInTheDocument()
  })

  it('shows every category for whitespace-only input', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(
      screen.getByRole('searchbox', { name: /find a resource/i }),
      '   ',
    )

    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(
      RESOURCE_CATEGORIES.length,
    )
  })

  it('shows a global empty state when no resources match', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(
      screen.getByRole('searchbox', { name: /find a resource/i }),
      'astronomy',
    )

    expect(screen.getByRole('status')).toHaveTextContent('No matches found')
    for (const category of RESOURCE_CATEGORIES) {
      expect(
        screen.queryByRole('region', { name: category }),
      ).not.toBeInTheDocument()
    }
  })

  it('shows a dedicated state when the source contains no resources', () => {
    render(<App resourceData={[]} />)

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /no resources are available yet/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent(
      'No resources available',
    )
    for (const category of RESOURCE_CATEGORIES) {
      expect(
        screen.queryByRole('region', { name: category }),
      ).not.toBeInTheDocument()
    }
  })

  it('sorts category sections alphabetically while preserving grouping', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.selectOptions(
      screen.getByRole('combobox', { name: /sort by/i }),
      'category-asc',
    )

    expect(
      screen
        .getAllByRole('heading', { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual([
      'Articles',
      'Fitness',
      'Meditation',
      'Newsletters',
      'Podcasts',
      'Recipes',
    ])
    expect(screen.getByRole('region', { name: /articles/i })).toHaveTextContent(
      'The Science of Sleep',
    )
  })

  it.each([
    [
      'title-asc',
      [
        'Fitness',
        'Recipes',
        'Meditation',
        'Podcasts',
        'Articles',
        'Newsletters',
      ],
    ],
    [
      'title-desc',
      [
        'Newsletters',
        'Articles',
        'Podcasts',
        'Meditation',
        'Recipes',
        'Fitness',
      ],
    ],
    [
      'duration-asc',
      [
        'Newsletters',
        'Articles',
        'Recipes',
        'Fitness',
        'Meditation',
        'Podcasts',
      ],
    ],
    [
      'duration-desc',
      [
        'Podcasts',
        'Meditation',
        'Recipes',
        'Fitness',
        'Articles',
        'Newsletters',
      ],
    ],
  ])(
    'reorders category sections globally for %s',
    async (sortOption, expectedCategories) => {
      const user = userEvent.setup()
      render(<App />)

      await user.selectOptions(
        screen.getByRole('combobox', { name: /sort by/i }),
        sortOption,
      )

      expect(
        screen
          .getAllByRole('heading', { level: 2 })
          .map((heading) => heading.textContent),
      ).toEqual(expectedCategories)
    },
  )

  it('keeps sorting active when search results change', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.selectOptions(
      screen.getByRole('combobox', { name: /sort by/i }),
      'title-asc',
    )
    await user.type(
      screen.getByRole('searchbox', { name: /find a resource/i }),
      'mindfulness',
    )

    const podcastsSection = screen.getByRole('region', { name: /podcasts/i })

    expect(podcastsSection).toHaveTextContent('Mindful Moments')
    expect(screen.getByRole('combobox', { name: /sort by/i })).toHaveValue(
      'title-asc',
    )
  })

  it('exposes the labelled sorting control to keyboard users', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.tab()
    expect(
      screen.getByRole('searchbox', { name: /find a resource/i }),
    ).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('combobox', { name: /sort by/i })).toHaveFocus()
  })
})

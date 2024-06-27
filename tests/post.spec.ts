import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Smoke', () => {
  test('has title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Posts with Apollo/);
  });

  test('redirect to /posts URL', async ({ page }) => {
    // Expects page to have a heading with the name of Installation.
    await expect(page).toHaveURL('/posts');
  });
});

test.describe('Posts list', () => {
  test('posts should be visible', async ({ page }) => {
    await expect(page.getByTestId('posts-list')).toBeVisible();
  });

  test('it should has 5 posts by default', async ({ page }) => {
    await expect(page.getByTestId('posts-list').locator('li')).toHaveCount(5);
  });

  test('it should delete item from the list', async ({ page }) => {
    await page
      .getByTestId('posts-list')
      .locator('li')
      .getByRole('button')
      .first()
      .click();
    await expect(page.getByTestId('posts-list').locator('li')).toHaveCount(4);
  });

  test('it should go to /posts/* URL on click', async ({ page }) => {
    await page.getByTestId('posts-list').getByRole('link').first().click();
    await expect(page).toHaveURL(/^http:\/\/localhost:3000\/posts\/\d+$/);
  });

  test('post title in preview and in the list should match', async ({
    page,
  }) => {
    await page.getByTestId('posts-list').getByRole('link').first().click();

    const postListTitle = await page
      .getByTestId('post-list-title')
      .first()
      .textContent();

    const postPreviewTitle = await page
      .getByTestId('post-preview-readmode-title')
      .textContent();

    expect(postPreviewTitle).toContain(postListTitle);
  });

  test('post title in preview and in the list should not match', async ({
    page,
  }) => {
    await page.getByTestId('posts-list').getByRole('link').first().click();

    const postListTitle = await page
      .getByTestId('post-list-title')
      .last()
      .textContent();

    const postPreviewTitle = await page
      .getByTestId('post-preview-readmode-title')
      .textContent();

    expect(postPreviewTitle).not.toContain(postListTitle);
  });
});

test.describe('Post', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('posts-list').getByRole('link').first().click();
  });

  test('it should correctly open the page', async ({ page }) => {
    await expect(page).toHaveURL(/^http:\/\/localhost:3000\/posts\/\d+$/);
  });

  test('it render read mode core elements', async ({ page }) => {
    const { titleReadMode, bodyReadMode, autoSaveCheckbox, bodyEditIcon } =
      await PostPreviewPOM(page);
    await expect(titleReadMode).toBeVisible();
    await expect(bodyReadMode).toBeVisible();
    await expect(autoSaveCheckbox).toBeVisible();
    await expect(bodyEditIcon).toBeVisible();
  });

  test('it should enable edit mode for title', async ({ page }) => {
    const { titleEditMode, enableTitleEditMode } = await PostPreviewPOM(page);
    await enableTitleEditMode();
    await expect(titleEditMode).toBeVisible();
  });

  test('it should enable edit mode for body', async ({ page }) => {
    const { bodyEditMode, enableBodyEditMode } = await PostPreviewPOM(page);
    await enableBodyEditMode();
    await expect(bodyEditMode).toBeVisible();
  });

  test('it should update title in the preview', async ({ page }) => {
    const { titleEditMode, enableTitleEditMode } = await PostPreviewPOM(page);
    await enableTitleEditMode();

    await titleEditMode.fill('123');
    await expect(titleEditMode).toHaveValue('123');
  });

  test('it should update title in the preview and in the list', async ({
    page,
  }) => {
    const { titleEditMode, titleReadMode, enableTitleEditMode } =
      await PostPreviewPOM(page);
    await enableTitleEditMode();
    await titleEditMode.fill('123');

    await page.getByTestId('post-preview-editmode-title-save-button').click();

    expect(await page.getByRole('status').last().textContent()).toContain(
      'Post updated successfully',
    );

    const postListTitle = await page
      .getByTestId('post-list-title')
      .first()
      .textContent();

    const postPreviewTitle = await titleReadMode.textContent();

    expect(postPreviewTitle).toContain(postListTitle);
  });

  test('it should update title with autosave', async ({ page }) => {
    const {
      titleEditMode,
      titleReadMode,
      autoSaveCheckbox,
      enableTitleEditMode,
    } = await PostPreviewPOM(page);
    await autoSaveCheckbox.click();
    await enableTitleEditMode();
    await titleEditMode.fill('123');

    await page.getByRole('button', { name: 'Preview' }).click();

    expect(await page.getByRole('status').last().textContent()).toContain(
      'Post updated successfully',
    );

    const postPreviewTitle = await titleReadMode.textContent();

    expect(postPreviewTitle).toContain('123');
  });
});

const PostPreviewPOM = async (page: Page) => {
  const [
    titleReadMode,
    titleEditMode,
    autoSaveCheckbox,
    bodyEditIcon,
    bodyReadMode,
    bodyEditMode,
  ] = await Promise.all([
    page.getByTestId('post-preview-readmode-title'),
    page.getByTestId('post-preview-editmode-title'),
    page.getByTestId('autosave-checkbox'),
    page.getByTestId('post-preview-edit-icon'),
    page.getByTestId('post-preview-readmode-body'),
    page.getByTestId('post-preview-editmode-body'),
  ]);

  const enableTitleEditMode = async () => {
    await page.getByRole('button', { name: 'Edit' }).click();
  };

  const enableBodyEditMode = async () => {
    await bodyEditIcon.click();
  };

  return {
    titleReadMode,
    titleEditMode,
    autoSaveCheckbox,
    bodyEditIcon,
    bodyReadMode,
    bodyEditMode,
    enableTitleEditMode,
    enableBodyEditMode,
  };
};

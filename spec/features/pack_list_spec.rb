require 'rails_helper'

feature 'On the packlist page' do
  before do
    visit pack_list_index_path
  end

  scenario 'I can add items', js: true do
    first('.js-add-item').click
    expect(page).to have_content 'New item'
  end

  scenario 'I can edit items using the pencil icon', js: true do
    first('.js-add-item').click
    first('h1').click
    first('.pack-list__edit').click
    expect(page).to have_css('.is-editing')
  end

  scenario 'I can edit items using double click', js: true do
    first('.js-add-item').click
    first('h1').click
    first('.pack-list__label').double_click
    expect(page).to have_css('.is-editing')
  end

  scenario 'I can delete items', js: true do
    first('.js-add-item').click
    first('.pack-list__delete').click
    expect(page).not_to have_content 'New item'
  end

  scenario 'I can check an item', js: true do
    first('.js-add-item').click
    first('.pack-list__checkbox').click
    expect(page).to have_css('.is-checked')
  end

end

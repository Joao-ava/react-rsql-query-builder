# React RSQL Query Builder

Component for create rsql filters.

## Usage

Basic sample.

```tsx
import React from 'react'
import 'react-rsql-query-builder/styles.css'
import ReactRsqlFilterBuilder, { Field } from 'react-rsql-query-builder'

const Filter: React.FC = () => {
  const [search, setSearch] = useState<ExpressionNode | undefined>(undefined)
  const fields: Field[] = [
    { selector: 'name', label: 'Name', type: 'string' },
    { selector: 'age', label: 'Age', type: 'number' },
    {
      selector: 'status',
      label: 'Status',
      type: 'array',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Deactivate', value: 'deactivate' },
        { label: 'Pending', value: 'pending' }
      ]
    }
  ]

  return (
    <ReactRsqlFilterBuilder
      search={search}
      setSearch={setSearch}
      fields={fields}
      language="en"
    />
  )
}
```

**Props**

- **search**: Is `ExpressionNode | undefined` from lib [@rsql/ast](https://www.npmjs.com/package/@rsql/ast).
- **setSearch**: Is set function typing `(search?: ExpressionNode) => undefined`.
- **fields**: Is an array of all fields you can filter.
  - **selector**: Is the path of your field do you want filter, (type `string`).
  - **label**: Is display name of field (type `string`).
  - **operators?**: Is operators valid in your field, is optional, one of `equals`, `notEquals`, `contains`, `notContains`, `moreThan`, `moreThanOrEqual`, `lessThan`, `lessThanOrEqual`, `in`, `out`.
  - **type**: Is type of field, one of `string`, `number`, `date`, `boolean`, `array`.
  - **options?**: Array of options you can select if `type` is `array`, not necessary if `type` is other value.
    - **label**: Is display name of value (type `string`).
    - **value**: Is value used in filter (type generic `T` default `string`).
  - **onSearchItems?**: It is a function to call in select (Not implemented by default).
- **language**: Language is display component is optional (type `string` default `en`).
- **i18n**: i18n object for translation is optional.
- **Button**: Button component following `ButtonHTMLAttributes<HTMLButtonElement>` is optional, you can use your component button of your library.
- **Input**: Input component following `InputHTMLAttributes<HTMLInputElement>` is optional, you can use your component input of your library.
- **Checkbox**: Checkbox component following `InputHTMLAttributes<HTMLInputElement>` is optional, you can use your component checkbox of your library.
- **Select**: Select component following `SelectProps<T = string>` is optional, you can use your component select of your library.
  - **SelectProps**: is a type props for select.
    - **option**: is current value of select (type `Option<T = string> = { label: string; value: T }`).
    - **items**: is a list of items to select display (type array of `Option`).
    - **setValue**: is a function to call when select an item of `items` (type `(value: T) => void`).
    - **className**: is a optional className to set css class to component (type `string`).

## Composition Pattern

The library also supports a composition pattern approach, which gives you more flexibility and control over the component structure. This is an alternative way to use the library, and you can choose either this approach or the basic usage shown above.

```tsx
import React from 'react'
import 'react-rsql-query-builder/styles.css'
import {
  FilterRoot,
  FilterTriggerContent,
  FilterTrigger,
  AppliedFiltersList,
  type FilterProps
} from 'react-rsql-query-builder'

const Filter: React.FC<FilterProps> = (props) => (
  <FilterRoot {...props}>
    <section className="rsql-main" data-testid="filter-main-section">
      <FilterTriggerContent>
        <FilterTrigger />
      </FilterTriggerContent>
      <AppliedFiltersList />
    </section>
  </FilterRoot>
)

// Then use it like this:
const MyComponent: React.FC = () => {
  const [search, setSearch] = useState<ExpressionNode | undefined>(undefined)
  const fields: Field[] = [
    { selector: 'name', label: 'Name', type: 'string' },
    { selector: 'age', label: 'Age', type: 'number' }
    // ...other fields
  ]

  return (
    <Filter
      search={search}
      setSearch={setSearch}
      fields={fields}
      language="en"
    />
  )
}
```

**Composition Components:**

- **FilterRoot**: The main container component that provides context to all child components.
- **FilterTriggerContent**: Wraps the trigger button and manages the popover state.
- **FilterTrigger**: The button that opens the filter selection popover.
- **AppliedFiltersList**: Displays the list of currently applied filters.

Using the composition pattern allows you to:

- Customize the layout and structure of the filter components
- Insert your own components between the filter components
- Apply custom styling more precisely
- Reuse parts of the filter UI in different contexts

## Translation

For default library have three languages english (en), portuguese (ptBr) and spanish (es), you can specify language do you want with prop `language` and you can customize or add language with prop `i18n` (Use [english translation as example](https://github.com/Joao-ava/react-rsql-query-builder/blob/main/src/i18n/locales/en.ts)).

## Commands

Show components.

```shell
npm run storybook
```

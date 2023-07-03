# React RSQL Query Builder

Component for create rsql filters.

## Usage

Basic sample.

```tsx
import React from 'react'
import 'react-rsql-query-builder/dist/style.css'
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
  - **type**: Is type of field, one of `string`, `number`, `date`, `array`.
  - **options?**: Array of options you can select if `type` is `array`, not necessary if `type` is other value.
    - **label**: Is display name of value (type `string`).
    - **value**: Is value used in filter (type generic `T` default `string`).
- **language**: Language is display component is optional (type `string` default `en`).
- **i18n**: i18n object for translation is optional.
- **Button**: Button component following `ButtonHTMLAttributes<HTMLButtonElement>` is optional, you can use your component button of your library.
- **Input**: Input component following `InputHTMLAttributes<HTMLInputElement>` is optional, you can use your component input of your library.

## Translation

For default library have three languages english (en), portuguese (ptBr) and spanish (es), you can specify language do you want with prop `language` and you can customize or add language with prop `i18n` (Use [english translation as example](src/i18n/types.ts)).

## Commands

Show components.

```shell
npm run storybook
```

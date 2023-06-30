# React RSQL Query Builder

Component for create rsql filters.

## Usage

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

## Translation

For default library have three languages english (en), portuguese (ptBr) and spanish (es).

## Commands

Show components.

```shell
npm run storybook
```

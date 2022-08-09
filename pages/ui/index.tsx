import { Button, Form, Input } from "components/ui"
import React, { ReactNode } from "react"
import { FiMenu } from "react-icons/fi"

export default function Components() {
  return (
    <div>
      <h1>Components</h1>

      <h2>Buttons</h2>

      <Section name="Colors">
        <Button color="default">Default</Button>
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button disabled>Disabled</Button>
      </Section>

      <Section name="Sizes">
        <Button color="primary" size="small">
          Small
        </Button>
        <Button color="primary" size="default">
          Default
        </Button>
        <Button color="primary" size="large">
          Large
        </Button>
      </Section>

      <Section name="Misc">
        <Button href="#" color="default" size="small">
          Link
        </Button>
        <Button href="#" color="primary" size="small">
          Link
        </Button>
        <Button href="#" color="secondary" size="small">
          Link
        </Button>
        <Button href="#" color="disabled" size="small">
          Link
        </Button>
      </Section>

      <Section name="Icon">
        <Button icon={<FiMenu size="100%" />} />
        <Button color="primary" icon={<FiMenu size="100%" />} />
        <Button color="secondary" icon={<FiMenu size="100%" />} />
        <Button disabled icon={<FiMenu size="100%" />} />
      </Section>

      <h2>Forms</h2>

      <Section name="">
        <Form className="gap-4">
          <Input name="username" label="Username" type="email" />
          <Input name="password" label="Password" type="password" />
          <Input name="displayName" label="Display Name" />
        </Form>
      </Section>
    </div>
  )
}

function Section({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="mb-4">
      {name && <h3>{name}</h3>}
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

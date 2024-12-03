import { useId } from 'react'
import { Input, Label } from './slots.tsx'
import { TextField } from './text-field.tsx'
import { Toggle, ToggleButton, ToggleOff, ToggleOn } from './toggle.tsx'

export function App() {
	const partyModeId = useId()
	return (
		<div>
			<div>
				<Toggle>
					<label htmlFor={partyModeId}>Party mode</label>
					<ToggleButton id={partyModeId} />
					<ToggleOn>Let's party 🥳</ToggleOn>
					<ToggleOff>Sad town 😭</ToggleOff>
				</Toggle>
			</div>
			<hr />
			<div>
				{/* 👩‍💻 So, basically, slots are a way to share props across the child components,
				 * this way we can have a clear component API, b/c we're defining all importent props/behavior on parent component
				 */}
				{/* 🦉 feel free to test the id customization by passing an id here */}
				<TextField>
					{/* 🦉 feel free to test the prop merging by passing props here */}
					<Label>Venue</Label>
					<Input />
				</TextField>
			</div>
		</div>
	)
}

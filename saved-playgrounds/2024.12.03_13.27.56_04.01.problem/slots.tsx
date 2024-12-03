import React from 'react'

// 🦺 create a Slots type that's just an object of objects
type Slots = Record<string, Record<string, unknown>>

// 🐨 create and export a SlotContext with that type and default it to an empty object
export const SlotContext = React.createContext<Slots>({})

// 🐨 create a useSlotProps hook which:
// 1. accepts props (any type) and slot (string)
// 2. gets the slots from the SlotContext
// 3. gets the props from the slot by its name
// 4. returns the merged props with the slot and given props
export function useSlotProps<T>(props: T, slot: string) {
	const slots = React.useContext(SlotContext)
	const slotProps = slots[slot] || {}
	return { ...slotProps, ...props }
}

export function Label(props: React.ComponentProps<'label'>) {
	// 🐨 get the props from useSlotProps for a slot called "label" and apply those to the label
	const slotProps = useSlotProps<React.ComponentProps<'label'>>(props, 'label')
	return <label {...slotProps} />
}

export function Input(props: React.ComponentProps<'input'>) {
	// 🐨 get the props from useSlotProps for a slot called "input" and apply those to the input
	const slotProps = useSlotProps<React.ComponentProps<'input'>>(props, 'input')
	return <input {...slotProps} />
}

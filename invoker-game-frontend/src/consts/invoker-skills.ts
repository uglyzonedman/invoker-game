import invoker_alacrity from '../assets/invoker_alacrity.png'
import invoker_chaos_meteor from '../assets/invoker_chaos_meteor.png'
import invoker_cold_snap from '../assets/invoker_cold_snap.png'
import invoker_deafening_blast from '../assets/invoker_deafening_blast.png'
import invoker_emp from '../assets/invoker_emp.png'
import invoker_forge_spirit from '../assets/invoker_forge_spirit.png'
import invoker_ghost_walk from '../assets/invoker_ghost_walk.png'
import invoker_ice_wall from '../assets/invoker_ice_wall.png'
import invoker_sun_strike from '../assets/invoker_sun_strike.png'
import invoker_tornado from '../assets/invoker_tornado.png'
import { IInvokerSkill } from '../types'

export const invokerSkills: IInvokerSkill[] = [
	{
		id: 1,
		name: 'Cold Snap',
		keys: ['q', 'q', 'q'],
		image: invoker_cold_snap,
	},
	{
		id: 2,
		name: 'Ghost Walk',
		keys: ['q', 'q', 'w'],
		image: invoker_ghost_walk,
	},
	{
		id: 3,
		name: 'Ice Wall',
		keys: ['q', 'q', 'e'],
		image: invoker_ice_wall,
	},
	{
		id: 4,
		name: 'EMP',
		keys: ['w', 'w', 'w'],
		image: invoker_emp,
	},
	{
		id: 5,
		name: 'Tornado',
		keys: ['w', 'w', 'q'],
		image: invoker_tornado,
	},
	{
		id: 6,
		name: 'Alacrity',
		keys: ['w', 'w', 'e'],
		image: invoker_alacrity,
	},
	{
		id: 7,
		name: 'Sun Strike',
		keys: ['e', 'e', 'e'],
		image: invoker_sun_strike,
	},
	{
		id: 8,
		name: 'Forge Spirit',
		keys: ['e', 'e', 'q'],
		image: invoker_forge_spirit,
	},
	{
		id: 9,
		name: 'Chaos Meteor',
		keys: ['e', 'e', 'w'],
		image: invoker_chaos_meteor,
	},
	{
		id: 10,
		name: 'Deafening Blast',
		keys: ['q', 'w', 'e'],
		image: invoker_deafening_blast,
	},
]

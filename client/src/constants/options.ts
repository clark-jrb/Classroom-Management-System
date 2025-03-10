

export const grade_levels = [
    { name: 'Grade 1', value: 'grade_1' },
    { name: 'Grade 2', value: 'grade_2' },
    { name: 'Grade 3', value: 'grade_3' },
    { name: 'Grade 4', value: 'grade_4'},
    { name: 'Grade 5', value: 'grade_5' },
    { name: 'Grade 6', value: 'grade_6' }
]

export const grade_levels_options = [
    { name: 'All', value: 'all'},
    ...grade_levels
]

export const sections = [
    { name: 'Crabs', value: 'crabs' },
    { name: 'Corals', value: 'corals' },
    { name: 'Pearls', value: 'pearls' },
    { name: 'Shrimps', value: 'shrimps' },
    { name: 'Squids', value: 'squids' },
    { name: 'Octopus', value: 'octopus' },
    { name: 'Lobsters', value: 'lobsters' },
    { name: 'Eels', value: 'eels' },
    { name: 'Turtles', value: 'turtles' },
    { name: 'Dolphins', value: 'dolphines' },
    { name: 'Whales', value: 'whales' },
    { name: 'Sharks', value: 'sharks' },
]

export const sections_options = [
    { name: 'All', value: 'all'},
    ...sections
]

export const subjects = [
    { name: 'Math', value: 'math' },
    { name: 'Science', value: 'science' },
    { name: 'English', value: 'english' },
    { name: 'Mapeh', value: 'mapeh' },
    { name: 'Hekasi', value: 'hekasi' },
    { name: 'Filipino', value: 'filipino' }
]

export const subjects_options = [
    { name: 'All', value: 'all'},
    ...subjects
]

export const grade_sections = [
    { grade: 'grade_1', sections: ['crabs', 'corals'] },
    { grade: 'grade_2', sections: ['pearls', 'shrimps'] },
    { grade: 'grade_3', sections: ['squids', 'octopus'] },
    { grade: 'grade_4', sections: ['lobsters', 'eels'] },
    { grade: 'grade_5', sections: ['turtles', 'dolphins'] },
    { grade: 'grade_6', sections: ['whales', 'sharks'] }
]

export const subjects_names = subjects.map(({ value }) => ({
    name: value
}))
import type { CellData, CellDifference, QuizQuestion, Achievement } from './types';

export const plantCellData: CellData = {
  name: 'Plant Cell',
  bgColor: 'bg-green-200',
  parts: [
    {
      id: 'plant-nucleus',
      name: 'Nucleus',
      shortDescription: "The cell's control center.",
      longDescription: 'The nucleus is like the brain or control center of the cell. It holds all of the cell\'s genetic material (DNA) and gives instructions for everything the cell does, like growing, dividing, and making proteins.',
      analogy: 'Think of it as the City Hall or main office of a bustling city, where all the important decisions and plans are made.',
      position: { top: '30%', left: '75%' },
    },
    {
      id: 'plant-vacuole',
      name: 'Large Central Vacuole',
      shortDescription: 'Stores water and maintains pressure.',
      longDescription: 'This is a large, sac-like organelle that stores water, nutrients, and waste products. In plant cells, it plays a crucial role in maintaining turgor pressure against the cell wall, which helps the plant stay rigid and upright.',
      analogy: 'It\'s like a giant water tower and storage warehouse for the cell, keeping it supplied and structurally sound.',
      position: { top: '50%', left: '40%' },
    },
    {
      id: 'plant-chloroplast',
      name: 'Chloroplast',
      shortDescription: 'Site of photosynthesis.',
      longDescription: 'Chloroplasts are the food factories of the plant cell. They contain chlorophyll, a green pigment that captures energy from sunlight. They use this energy to convert carbon dioxide and water into glucose (sugar), a process called photosynthesis.',
      analogy: 'These are like tiny solar-powered sugar factories, providing energy for the entire plant.',
      position: { top: '70%', left: '70%' },
    },
    {
      id: 'plant-cell-wall',
      name: 'Cell Wall',
      shortDescription: 'Provides structural support.',
      longDescription: 'The cell wall is a tough, rigid outer layer that surrounds the cell membrane. Made mostly of cellulose, it provides structural support and protection to the plant cell, preventing it from bursting when it takes in too much water.',
      analogy: 'It acts like a strong brick wall or an external skeleton, giving the plant cell a fixed shape and protection.',
      position: { top: '50%', left: '5%' },
    },
    {
      id: 'plant-cell-membrane',
      name: 'Cell Membrane',
      shortDescription: 'Controls what enters and leaves.',
      longDescription: 'Located just inside the cell wall, the cell membrane is a flexible barrier that regulates which substances can pass in and out of the cell. It is selectively permeable, meaning it carefully chooses what to let through.',
      analogy: 'This is like the security gate or border control of the cell, managing all imports and exports.',
      position: { top: '50%', left: '12%' },
    },
    {
      id: 'plant-cytoplasm',
      name: 'Cytoplasm',
      shortDescription: 'Jelly-like substance filling the cell.',
      longDescription: 'Cytoplasm is the jelly-like substance that fills the entire cell and surrounds all the organelles. Many important chemical reactions happen here, and it helps give the cell its shape.',
      analogy: 'It\'s like the atmosphere and ground of our city, where all the buildings (organelles) are located and all the work happens.',
      position: { top: '20%', left: '20%' },
    },
    {
      id: 'plant-mitochondria',
      name: 'Mitochondria',
      shortDescription: "The cell's powerhouse.",
      longDescription: 'Mitochondria are the powerhouses of the cell. They perform cellular respiration, taking in nutrients and breaking them down to create energy-rich molecules (ATP) that fuel the cell\'s activities.',
      analogy: 'It acts like a power plant or a battery, generating all the energy the cell city needs to operate.',
      position: { top: '80%', left: '30%' },
    }
  ],
};

export const animalCellData: CellData = {
  name: 'Animal Cell',
  bgColor: 'bg-pink-200',
  parts: [
    {
      id: 'animal-nucleus',
      name: 'Nucleus',
      shortDescription: "The cell's control center.",
      longDescription: 'Just like in a plant cell, the nucleus is the control center. It contains the animal cell\'s DNA and directs all of its activities, ensuring the cell functions correctly and reproduces.',
      analogy: 'This is the City Hall of the animal cell city, holding the master blueprints (DNA) for everything.',
      position: { top: '50%', left: '50%' },
    },
    {
      id: 'animal-vacuole',
      name: 'Vacuole',
      shortDescription: 'Small storage sacs.',
      longDescription: 'Animal cells may have several small vacuoles. These are used for temporarily storing and transporting substances like food, water, and waste. They are much smaller and less prominent than the large central vacuole in plant cells.',
      analogy: 'Think of these as small storage closets or delivery vans, used for various tasks around the cell city.',
      position: { top: '70%', left: '75%' },
    },
    {
      id: 'animal-cell-membrane',
      name: 'Cell Membrane',
      shortDescription: 'Controls what enters and leaves.',
      longDescription: 'The cell membrane is the outer boundary of an animal cell. This flexible layer controls everything that comes into and goes out of the cell, protecting it from its surroundings and allowing it to interact with other cells.',
      analogy: 'It\'s the city border and security checkpoint, protecting the cell and managing all traffic.',
      position: { top: '50%', left: '10%' },
    },
    {
      id: 'animal-cytoplasm',
      name: 'Cytoplasm',
      shortDescription: 'Jelly-like substance filling the cell.',
      longDescription: 'The cytoplasm is the jelly-like material that fills the cell and holds all the organelles in place. It\'s where many of the cell\'s metabolic reactions, like breaking down food for energy, take place.',
      analogy: 'This is the environment of the cell city, the bustling streets and air where everything happens.',
      position: { top: '30%', left: '30%' },
    },
    {
      id: 'animal-mitochondria',
      name: 'Mitochondria',
      shortDescription: "The cell's powerhouse.",
      longDescription: 'Mitochondria are the powerhouses of the cell. They perform cellular respiration, taking in nutrients and breaking them down to create energy-rich molecules (ATP) that fuel the cell\'s activities.',
      analogy: 'It acts like a power plant or a battery, generating all the energy the cell city needs to operate.',
      position: { top: '30%', left: '70%' },
    }
  ],
};

export const DIFFERENCES: CellDifference[] = [
  { id: 1, feature: 'Cell Wall', plant: 'Present', animal: 'Absent' },
  { id: 2, feature: 'Shape', plant: 'Fixed, Rectangular Shape', animal: 'Flexible, Roundish Shape' },
  { id: 3, feature: 'Chloroplasts', plant: 'Present', animal: 'Absent' },
  { id: 4, feature: 'Vacuole', plant: 'One Large Central Vacuole', animal: 'Few Small Vacuoles' },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        question: "Which part is known as the 'control center' of the cell?",
        options: ["Mitochondria", "Nucleus", "Ribosome", "Cell Membrane"],
        correctAnswer: "Nucleus",
    },
    {
        question: "Which of these is found in a plant cell but NOT in an animal cell?",
        options: ["Cell Wall", "Cytoplasm", "Nucleus", "Cell Membrane"],
        correctAnswer: "Cell Wall",
    },
    {
        question: "What is the main function of chloroplasts?",
        options: ["Store water", "Control the cell", "Make food using sunlight", "Protect the cell"],
        correctAnswer: "Make food using sunlight",
    },
    {
        question: "What is the jelly-like substance that fills the cell?",
        options: ["Nucleus", "Vacuole", "Cytoplasm", "Chlorophyll"],
        correctAnswer: "Cytoplasm",
    },
    {
        question: "What part of the cell is known as the 'powerhouse' because it creates energy?",
        options: ["Nucleus", "Chloroplast", "Mitochondria", "Vacuole"],
        correctAnswer: "Mitochondria",
    },
    {
        question: "Why do plant cells have a fixed, rectangular shape?",
        options: ["They have a bigger nucleus", "They have a strong Cell Wall", "They are filled with more water", "They don't need to move"],
        correctAnswer: "They have a strong Cell Wall",
    },
    {
        question: "What is the main role of the large central vacuole in a plant?",
        options: ["To make the plant green", "To store water and keep the plant firm", "To create energy from sunlight", "To protect the cell from viruses"],
        correctAnswer: "To store water and keep the plant firm",
    },
];

export const ACHIEVEMENTS_DATA: Omit<Achievement, 'unlocked'>[] = [
  {
    id: 'discoverer',
    name: 'Difference Discoverer',
    description: 'Find all the differences between plant and animal cells.',
    icon: 'M12 6.25278V19.2528M12 6.25278C10.83-1.24722 2.83333 1.75278 2 5.25278C2.83333 8.75278 7.8 11.2528 12 6.25278ZM12 6.25278C13.17 -1.24722 21.1667 1.75278 22 5.25278C21.1667 8.75278 16.2 11.2528 12 6.25278Z',
  },
  {
    id: 'explorer',
    name: 'Cell Explorer',
    description: 'Learn about every part of both cells.',
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  },
  {
    id: 'speed_learner',
    name: 'Speed Learner',
    description: 'Find all differences in under 30 seconds!',
    icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  },
  {
    id: 'quiz_master',
    name: 'Quiz Master',
    description: 'Get a perfect score on the quiz.',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  },
];
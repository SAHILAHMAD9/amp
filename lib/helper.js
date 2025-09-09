export const handleScrollToDiv = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' })
}

export const universities = [
    "Stanford",
    "JMI",
    "Harvard",
    "Berkeley",
    "Carnegie Mellon"
];


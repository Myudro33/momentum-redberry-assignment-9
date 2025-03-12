const getColor = () => {
    const root = document.documentElement;
    const colors = [getComputedStyle(root).getPropertyValue('--pink'),getComputedStyle(root).getPropertyValue('--blue'),getComputedStyle(root).getPropertyValue('--orange'),getComputedStyle(root).getPropertyValue('--yellow')]
   return colors
}

export default getColor
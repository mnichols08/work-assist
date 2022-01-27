import chroma from 'chroma-js'
const levels = [900, 800, 700, 600, 500, 400, 300, 200, 100, 50]

function RGBToHSL(color) {
  const rgb = color.split(',')
  let r = parseInt(rgb[0])
  let g = parseInt(rgb[1])
  let b = parseInt(rgb[2])
  r /= 255
  g /= 255
  b /= 255
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0, s = 0, l = 0;
  if (delta === 0)
    h = 0;
  else if (cmax === r)
    h = ((g - b) / delta) % 6
  else if (cmax === g)
    h = (b - r) / delta + 2
  else
    h = (r - g) / delta + 4

  h = Math.round(h * 60)

  if (h < 0)
      h += 360
    l = (cmax + cmin) / 2

    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

    s = +(s * 100).toFixed(1)
    l = +(l * 100).toFixed(1)
  
    return "hsl(" + h + "," + s + "%," + l + "%)"
  
}

function generateCustomer(starterTicket) { 
  let newTicket = {
    ticketName: starterTicket.ticketName,
    id: starterTicket.id,
    emoji: starterTicket.emoji,
    colors: {}
  }
  for (let level of levels) {
    newTicket.colors[level] = []
  }
  for (let color of starterTicket.colors) {
    let scale = getScale(color.color, 10)
    for (let i in scale) {
      newTicket.colors[levels[i]].push({
        name: `${color.name.replace(/([A-Z])/g, ' $1').trim()} ${levels[i] === 500 ? '' : levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, '-'),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace("rgb", "rgba")
          .replace(")", ",1.0)"),
          hsl: RGBToHSL(chroma(scale[i]).css().replace('rgb(','').replace(')','')),
      })
    }
  }
  return newTicket
}
  function getRange(hexColor) {
    const end= "#fff"
    return [
      chroma(hexColor)
        .darken(1.4)
        .hex(),
      hexColor,
      end
    ]

  }

  function getScale(hexColor, numberOfColors) {
    return chroma
      .scale(getRange(hexColor))
      .mode('lab')
      .colors(numberOfColors)
  }


export { generateCustomer }
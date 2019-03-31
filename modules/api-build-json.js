import axios from 'axios'
import fse from 'fs-extra'
import ps from 'xml2js'

export default function apiBuildJson() {
  const api = axios.create()
  const distJosonFile = './static/_nuxt/api/index.json'
  const arr = []
  const organizeNotePosts = (data) => {
    return data.filter(x => {
      const title = x.title[0]
      const targetArr = ['イデアの眷属', 'noteとTwitterのすみ分けについて']
      if (
        title.indexOf(targetArr[0]) === -1 &&
        title.indexOf(targetArr[1]) === -1
      ) {
        return x
      }
    })
  }
  const getThumbnails = (data) => {
    let thumbnails = data.match(/https(.|\s)*?(jpg|png|gif|jpeg)/gi)
    return (thumbnails !== null && thumbnails !== undefined)
      ? Object.values(thumbnails)
      : false
  }

  return axios.all([
    api.get('https://note.nokura.me/rss'),
  ]).then(axios.spread((nokura) => {
    // XML を格納するリスト
    const xml = {
      note: nokura.data
    }

    // JSON を格納するためのオブジェクト
    let json = {
      note: {
        title: 'note',
        url: 'https://note.nokura.me/',
        items: []
      }
    }

    // XML オブジェクト を JSON に変換して JSON オブジェクトに格納する
    Object.keys(xml).forEach((key) => {
      ps.parseString(xml[key], (message, xmlres) => {
        json[key].items = xmlres.rss.channel[0].item
      })
    })

    // note の配列から表示しない記事を削除
    json.note.items = organizeNotePosts(json.note.items)

    // サムネイルを取得した配列を作成して結合
    json.note.items.forEach((data) => {
      let thumb = getThumbnails(data.description[0])
      Object.assign(data, { thumb: thumb })
    })

    arr.push(json)
    fse.outputFile(distJosonFile, JSON.stringify(arr))
  }))
}

'use strict'

const Hashids = use('Hashids')
const Article = use('App/Models/Article')
const Translation = use('App/Models/ArticleTranslation')

class ArticleTranslationController {
  async show ({ params }) {
    const translation = await Translation.query()
      .where('id', Hashids.decode(params.id))
      .with('language')
      .first()

    return translation
  }

  async store ({ params, request }) {
    const article = await Article
      .query()
      .where('id', Hashids.decode(params.id))
      .first()

    const data = this.$getFormField(request)

    await article.translations().create(data)
    await article.load('translations')

    return article
  }

  async update ({ params, request }) {
    const translation = await Translation
      .query()
      .where('id', Hashids.decode(params.id))
      .first()

    translation.merge(this.$getFormField(request))

    await translation.save()

    return translation
  }

  async destroy ({ params, response }) {
    await Translation.query().where('id', Hashids.decode(params.id)).delete()

    return response.noContent()
  }

  $getFormField (request) {
    return request.only([
      'headline', 'description', 'body', 'language_id', 'state_id'
    ])
  }
}

module.exports = ArticleTranslationController

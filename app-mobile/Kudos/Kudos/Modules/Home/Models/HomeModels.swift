//
//  HomeModels.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 19/07/25.
//

enum HomeModels {
    struct UserModel: ParameterConvertible {
        var name: String?
        var category: [CategoryModel]
        var starCount:Int?
        var dept: String?
        var skillTags: [String]
    }
    struct CategoryModel: ParameterConvertible {
        var name: String?
        var starCount: Int?
        var recognizedBy: [String]
    }
}

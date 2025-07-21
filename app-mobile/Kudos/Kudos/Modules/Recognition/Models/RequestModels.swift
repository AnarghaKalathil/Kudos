//
//  RequestModels.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 20/07/25.
//

enum RequestModels {
    struct ReqModel: ParameterConvertible {
        var fromName: String?
        var forName: String?
        var category: String?
        var dept: String?
        var commects: String?
        var tag: String?
        var date: String?
        var status: String?
    }
}

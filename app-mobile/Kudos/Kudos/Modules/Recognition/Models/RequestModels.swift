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
    
    struct RecognitionReq: ParameterConvertible {
        var sender: Int?
        var receiver: Int?
        var category: Int?
        var message: String?
        var skills: [Int]
        var reviewer: Int?

    }
    
    struct RecognitionResponse: ParameterConvertible {
        var message: String?
        var status: Bool?
    }
    
    struct RecognitionStatusReq: ParameterConvertible {
        var id: Int?
        var status: String?
    }
}

//
//  PeopleModel.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 22/07/25.
//

enum PeopleModel {
    struct PeopleResponse: ParameterConvertible {
        var data: [Recognitions]
        var status: Bool?
    }
    
    struct Recognitions: ParameterConvertible {
        var userId: Int?
        var name: String?
        var email: String?
        var designation: String?
        var starCount: Int?
        var skills: [Skills]
        var recognitions: RecognitionStatus
        
        enum CodingKeys: String, CodingKey {
            case userId = "user_id"
            case name, email, designation
            case starCount = "star_count"
            case skills, recognitions
        }
        
    }
    
    struct Skills: ParameterConvertible {
        var name: String?
    }
    
    struct RecognitionStatus: ParameterConvertible {
        var pending: [Recognition]
        var approved: [Recognition]
        var rejected: [Recognition]
    }
    
    struct Recognition: ParameterConvertible {
        var sender: String?
        var receiver: String?
        var category: String?
        var message: String?
        var skills: [String]
        var reviewer: String?
    }
    
    
}


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
    
    
    struct DashboardResponse: ParameterConvertible {
        var user_data: UserData
        var top_users: [TopUser]
    }
    
    struct UserData: ParameterConvertible {
        var star_count: Int?
        var recognitions: Recognitions
        var skills: [Skill]
    }
    
    struct Recognitions: ParameterConvertible {
        var pending: [RecognitionItem]
        var approved: [RecognitionItem]
        var rejected: [RecognitionItem]
    }
    struct AllRecognitions: ParameterConvertible {
        var data: [RecognitionItem]
    }
    struct RecognitionItem: ParameterConvertible {
        var id: Int?
        var category: String?
        var message: String?
        var is_reviewed: Bool?
        var reviewed_at: String?
        var created_at: String?
        var sender: String?
        var reviewer: String?
        var skills: [String]
        var receiver: String?
        var status: String?
    }
    
    struct Skill: ParameterConvertible {
        var name: String?
    }
    
    struct TopUser: ParameterConvertible {
        var username: String?
        var first_name: String?
        var last_name: String?
        var star_count: Int?
        var categories: [Category]
        var skills: [Skill]
    }
    
    struct Category: ParameterConvertible {
        var id: Int?
        var name: String?
        var created_at: String?
        var updated_at: String?
    }
    
    struct ProfileData: ParameterConvertible {
        var userId: Int?
        var name: String?
        var star_summary: [String: Int]
        var totalStars: Int?
        var recognitions: [RecognitionItem]
    }
    
}

enum SkillModels {
    struct SkillModel: ParameterConvertible {
        var data: [SkillData]
        var message: String?
        var status: Bool?
    }
    
    struct SkillData: Codable {
        var id: Int?
        var name: String?
    }
    
}

enum CategoryModel {
    struct CategoriesResponse: ParameterConvertible {
        var data: [Category]
    }

    struct Category: ParameterConvertible {
        var id: Int
        var name: String
        var created_at: String
        var updated_at: String
    }
    
    struct UserCategory: ParameterConvertible {
        var name: String?
        var count: Int?
        var senders: [String]
    }

}

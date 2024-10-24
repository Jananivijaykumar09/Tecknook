import React, { useState } from 'react';
import { Card, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Resources.css';

const subjects = {
    "6": ["Mathematics", "Science", "English", "Social Science", "Tamil"],
    "7": ["Mathematics", "Science", "English", "Social Science", "Tamil"],
    "8": ["Mathematics", "Science", "English", "Social Science", "Tamil"],
    "9": ["Mathematics", "Science", "English", "Social Science", "Tamil"],
    "10": ["Mathematics", "Science", "English", "Social Science", "Tamil"],
    "11": ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Tamil"],
    "12": ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Tamil"]
};

const pdfLinks = {
    "cbse": {
        "6": {
            "Mathematics": "https://firebasestorage.googleapis.com/v0/b/technook-9c349.appspot.com/o/question-papers%2Fcbse%2Fclass6%2Fmathematics.pdf?alt=media&token=b7dc68b3-237e-4b01-b0f9-7e36cfc77995",
            "Science": "https://example.com/pdf/cbse/class6/science.pdf",
            "English": "https://example.com/pdf/cbse/class6/english.pdf",
            "Social Science": "https://example.com/pdf/cbse/class6/social-science.pdf",
            "Tamil": "https://example.com/pdf/cbse/class6/tamil.pdf"
        },
        "7": {
            "Mathematics": "",
            "Science": "https://example.com/pdf/cbse/class7/science.pdf",
            "English": "https://example.com/pdf/cbse/class7/english.pdf",
            "Social Science": "https://example.com/pdf/cbse/class7/social-science.pdf",
            "Tamil": "https://example.com/pdf/cbse/class7/tamil.pdf"
        },
        // Add similar structure for standards 8 to 12
    },
    "samacheer": {
        "6": {
            "Mathematics": "https://example.com/pdf/samacheer/class6/mathematics.pdf",
            "Science": "https://example.com/pdf/samacheer/class6/science.pdf",
            "English": "https://example.com/pdf/samacheer/class6/english.pdf",
            "Social Science": "https://example.com/pdf/samacheer/class6/social-science.pdf",
            "Tamil": "https://example.com/pdf/samacheer/class6/tamil.pdf"
        },
        "7": {
            "Mathematics": "https://example.com/pdf/samacheer/class7/mathematics.pdf",
            "Science": "https://example.com/pdf/samacheer/class7/science.pdf",
            "English": "https://example.com/pdf/samacheer/class7/english.pdf",
            "Social Science": "https://example.com/pdf/samacheer/class7/social-science.pdf",
            "Tamil": "https://example.com/pdf/samacheer/class7/tamil.pdf"
        },
        // Add similar structure for standards 8 to 12
    }
};

const booksLinks = {
    "6": {
        "Mathematics": {
            "samacheer": {
                "Term 1": "https://firebasestorage.googleapis.com/v0/b/technook-9c349.appspot.com/o/6%2Fsamacheer%2FTerm1%2FMaths%2FMaths-Term%201.pdf?alt=media&token=1a451647-fa95-4c2e-9971-d682096dbf55",
                "Term 2": "https://firebasestorage.googleapis.com/v0/b/technook-9c349.appspot.com/o/6%2Fsamacheer%2FTerm2%2FMaths%2FMaths-Term%202.pdf?alt=media&token=f68256ba-9a19-4773-9ced-f9aade68f2a4",
                "Term 3": "https://firebasestorage.googleapis.com/v0/b/technook-9c349.appspot.com/o/6%2Fsamacheer%2FTerm3%2FMaths%2FMaths-Term%203.pdf?alt=media&token=b4c3f6e9-7714-469a-8bff-65adaacfee61"
            },
            "cbse": "https://example.com/books/cbse/class6/mathematics.pdf"
        },
        "Science": {
            "samacheer": {
                "Term 1": "https://firebasestorage.googleapis.com/v0/b/technook-9c349.appspot.com/o/6%2Fsamacheer%2FTerm1%2FScience%2FScience%20and%20Social-Term%201.pdf?alt=media&token=4ced5470-4010-40ce-8655-9c25c8884e1f",
                "Term 2": "https://firebasestorage.googleapis.com/v0/b/technook-9c349.appspot.com/o/6%2Fsamacheer%2FTerm2%2FScience%2FScience%20and%20Social-Term%202.pdf?alt=media&token=e598be84-72a9-465b-8d49-6ab4b5409e47",
                "Term 3": "https://firebasestorage.googleapis.com/v0/b/technook-9c349.appspot.com/o/6%2Fsamacheer%2FTerm3%2FScience%20and%20Social%2FScience%20and%20Social-Term%203.pdf?alt=media&token=5855b3f1-4922-4b00-9555-484b6f79d3d8"
            },
            "cbse": "https://example.com/books/cbse/class6/science.pdf"
        },
        "English": {
            "samacheer": {
                "Term 1": "https://firebasestorage.googleapis.com/v0/b/technook-9c349.appspot.com/o/6%2Fsamacheer%2FTerm1%2FEnglish%2FEnglish-Term%201.pdf?alt=media&token=7dca9dff-ba98-4237-a0e6-59925cebbf47",
                "Term 2": "https://firebasestorage.googleapis.com/v0/b/technook-9c349.appspot.com/o/6%2Fsamacheer%2FTerm2%2FEnglish%2FEnglish-Term%202.pdf?alt=media&token=b82f4cc5-e24f-4e52-acdf-b8f2439a92a4",
                "Term 3": "https://firebasestorage.googleapis.com/v0/b/technook-9c349.appspot.com/o/6%2Fsamacheer%2FTerm3%2FTamil%20and%20English-Term%203%2FTamil%20and%20English-Term%203.pdf?alt=media&token=af12229e-e7b4-4d65-894a-a807825bf1fd"
            },
            "cbse": "https://example.com/books/cbse/class6/english.pdf"
        },
        "Social Science": {
            "samacheer": {
                "Term 1": "https://firebasestorage.googleapis.com/v0/b/technook-9c349.appspot.com/o/6%2Fsamacheer%2FTerm1%2FSocial%20Science%2FScience%20and%20Social-Term%201.pdf?alt=media&token=86593393-d962-4746-92aa-62247b4a5289",
                "Term 2": "https://firebasestorage.googleapis.com/v0/b/technook-9c349.appspot.com/o/6%2Fsamacheer%2FTerm2%2FSocial%2FScience%20and%20Social-Term%202.pdf?alt=media&token=c4837ee1-f8c1-4813-a61c-5182d7930776",
                "Term 3": "https://firebasestorage.googleapis.com/v0/b/technook-9c349.appspot.com/o/6%2Fsamacheer%2FTerm3%2FScience%20and%20Social%2FScience%20and%20Social-Term%203.pdf?alt=media&token=5855b3f1-4922-4b00-9555-484b6f79d3d8"
            },
            "cbse": "https://example.com/books/cbse/class6/social-science.pdf"
        },
        "Tamil": {
            "samacheer": {
                "Term 1": "https://firebasestorage.googleapis.com/v0/b/technook-9c349.appspot.com/o/6%2Fsamacheer%2FTerm1%2FTamil%2FTamil-Term%201.pdf?alt=media&token=e79fd6a6-0f9a-4360-bf7b-dc341fb8b077",
                "Term 2": "https://firebasestorage.googleapis.com/v0/b/technook-9c349.appspot.com/o/6%2Fsamacheer%2FTerm2%2FTamil%2FTamil-Term%202.pdf?alt=media&token=9b23e383-78c3-4444-a3ee-7494c87c35fe",
                "Term 3": "https://firebasestorage.googleapis.com/v0/b/technook-9c349.appspot.com/o/6%2Fsamacheer%2FTerm3%2FTamil%20and%20English-Term%203%2FTamil%20and%20English-Term%203.pdf?alt=media&token=af12229e-e7b4-4d65-894a-a807825bf1fd"
            },
            "cbse": "https://example.com/books/cbse/class6/tamil.pdf"
        }
    },
    "7": {
        "Mathematics": {
            "samacheer": {
                "Term 1": "https://firebasestorage.googleapis.com/v0/b/technook-9c349.appspot.com/o/7%2FSamacheer%2FTerm1%2FMaths%2FMaths%20Term-1.pdf?alt=media&token=03ad97f6-c2e1-432a-8161-8a1bbcb8023d",
                "Term 2": "https://example.com/books/samacheer/class7/mathematics-term2.pdf",
                "Term 3": "https://example.com/books/samacheer/class7/mathematics-term3.pdf"
            },
            "cbse": "https://example.com/books/cbse/class7/mathematics.pdf"
        },
        "Science": {
            "samacheer": {
                "Term 1": "https://firebasestorage.googleapis.com/v0/b/technook-9c349.appspot.com/o/7%2FSamacheer%2FTerm1%2FScience%2FScience%20Term-1.pdf?alt=media&token=4ea12b32-3eb0-4a47-9f73-cb8e49c2d7b6",
                "Term 2": "https://example.com/books/samacheer/class7/science-term2.pdf",
                "Term 3": "https://example.com/books/samacheer/class7/science-term3.pdf"
            },
            "cbse": "https://example.com/books/cbse/class7/science.pdf"
        },
        "English": {
            "samacheer": {
                "Term 1": "https://firebasestorage.googleapis.com/v0/b/technook-9c349.appspot.com/o/7%2FSamacheer%2FTerm1%2FEnglish%2FEnglish%20Term-1.pdf?alt=media&token=1cc8eac1-b818-4ab8-9a2d-59b062f0d800",
                "Term 2": "https://example.com/books/samacheer/class7/english-term2.pdf",
                "Term 3": "https://example.com/books/samacheer/class7/english-term3.pdf"
            },
            "cbse": "https://example.com/books/cbse/class7/english.pdf"
        },
        "Social Science": {
            "samacheer": {
                "Term 1": "https://firebasestorage.googleapis.com/v0/b/technook-9c349.appspot.com/o/7%2FSamacheer%2FTerm1%2FSocial%2FSocial%20Term-1.pdf?alt=media&token=100f55e3-017d-4938-beb7-60a4f9a7af78",
                "Term 2": "https://example.com/books/samacheer/class7/social-science-term2.pdf",
                "Term 3": "https://example.com/books/samacheer/class7/social-science-term3.pdf"
            },
            "cbse": "https://example.com/books/cbse/class7/social-science.pdf"
        },
        "Tamil": {
            "samacheer": {
                "Term 1": "https://firebasestorage.googleapis.com/v0/b/technook-9c349.appspot.com/o/7%2FSamacheer%2FTerm1%2FTamil%2FTamil%20Term%20-1.pdf?alt=media&token=86dad6a2-4e57-4679-b317-133a60a7de99",
                "Term 2": "https://example.com/books/samacheer/class7/tamil-term2.pdf",
                "Term 3": "https://example.com/books/samacheer/class7/tamil-term3.pdf"
            },
            "cbse": "https://example.com/books/cbse/class7/tamil.pdf"
        }
    },

};
const videoOptions = [
    { id: 1, title: "Video 1", url: "https://firebasestorage.googleapis.com/v0/b/technook-9c349.appspot.com/o/video%2Fvideo2.mp4?alt=media&token=05b1307c-b12c-484a-a8b1-849120bd7874" },
    { id: 2, title: "Video 2", url: "https://firebasestorage.googleapis.com/v0/b/technook-9c349.appspot.com/o/video%2FNEET2.mp4?alt=media&token=6114f25a-698e-4057-9069-14d7c71e986f" }
    // Add more videos as needed
];

const Resources = () => {
    const [selectedStandard, setSelectedStandard] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedSyllabus, setSelectedSyllabus] = useState(null);
    const [selectedResourceType, setSelectedResourceType] = useState(null);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);  // <-- Add this line


    const navigate = useNavigate();  // Changed from useHistory to useNavigate

    // Event handler for video selection
    const handleVideoSelect = (videoUrl,videoTitle) => {
        setSelectedVideo(videoUrl);
        navigate('/video', { state: { videoUrl,videoTitle } });
    };

    const handleStandardSelect = (standard) => {
        setSelectedStandard(standard);
        setSelectedSubject(null);
        setSelectedSyllabus(null);
        setSelectedTerm(null);
    };

    const handleSubjectSelect = (subject) => {
        setSelectedSubject(subject);
        setSelectedSyllabus(null);
        setSelectedTerm(null);
    };

    const handleSyllabusSelect = (syllabus) => {
        setSelectedSyllabus(syllabus);
        setSelectedTerm(null);
    };

    const handleResourceTypeSelect = (resourceType) => {
        setSelectedResourceType(resourceType);
        setSelectedStandard(null);
        setSelectedSubject(null);
        setSelectedSyllabus(null);
        setSelectedTerm(null);
        setSelectedVideo(null);
    };

    const handleTermSelect = (term) => {
        setSelectedTerm(term);
    };

    return (
        <section id="resources" className="resources-section-home">
            <div className="container">
            <h2 className="text-center mb-4" style={{ color: "white" }}>Resources</h2>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <ResourceCard
                            title="PDF Documents"
                            imageUrl="/pdf-icon.png"
                            description="Explore our collection of downloadable PDF documents."
                            onSelect={() => handleResourceTypeSelect('pdf')}
                            isCentered
                        />
                    </div>
                    <div className="col-md-4 mb-4">
                        <ResourceCard
                            title="Books"
                            imageUrl="/bookimg.png"
                            description="Discover recommended books for learning and reference."
                            onSelect={() => handleResourceTypeSelect('books')}
                            isCentered
                        />
                    </div>
                    <div className="col-md-4 mb-4">
                        <ResourceCard
                            title="Videos"
                            imageUrl="/video-icon-29.png"
                            description="Watch educational videos covering various topics and exams."
                            onSelect={() => handleResourceTypeSelect('videos')}
                            isCentered
                        />
                    </div>
                </div>

                {selectedResourceType && selectedResourceType !== 'videos' && (
                    <div className="mt-4">
                        <h3>{selectedResourceType.toUpperCase()}</h3>
                        <DropdownButton
                            title={selectedStandard || "Select Grade"}
                            onSelect={handleStandardSelect}
                            className="mb-2"
                        >
                            {[6, 7, 8, 9, 10, 11, 12].map(std => (
                                <Dropdown.Item eventKey={std} key={std}>Grade{std}</Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>
                )}

                {selectedStandard && (
                    <div className="mt-4">
                        <h4>Grade {selectedStandard}</h4>
                        <DropdownButton
                            title={selectedSubject || "Select Subject"}
                            onSelect={handleSubjectSelect}
                            className="mb-2"
                        >
                            {subjects[selectedStandard].map(subject => (
                                <Dropdown.Item eventKey={subject} key={subject}>{subject}</Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>
                )}

                {selectedSubject && selectedResourceType === 'pdf' && (
                    <div className="mt-4">
                        <h5>{selectedSubject}</h5>
                        <Button variant="outline-primary" onClick={() => handleSyllabusSelect("cbse")}>CBSE</Button>
                        <Button variant="outline-secondary" onClick={() => handleSyllabusSelect("samacheer")}>Samacheer</Button>
                    </div>
                )}

                {selectedSubject && selectedResourceType === 'books' && (
                    <div className="mt-4">
                        <h5>{selectedSubject}</h5>
                        <Button variant="outline-primary" onClick={() => handleSyllabusSelect("cbse")}>CBSE</Button>
                        <Button variant="outline-secondary" onClick={() => handleSyllabusSelect("samacheer")}>Samacheer</Button>
                    </div>
                )}

                {selectedSyllabus && selectedResourceType === 'books' && selectedSyllabus === 'samacheer' && (
                    <div className="mt-4">
                        <h5>{selectedSyllabus.toUpperCase()} - {selectedSubject}</h5>
                        <DropdownButton
                            title={selectedTerm || "Select Term"}
                            onSelect={handleTermSelect}
                            className="mb-2"
                        >
                            {["Term 1", "Term 2", "Term 3"].map(term => (
                                <Dropdown.Item eventKey={term} key={term}>{term}</Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>
                )}

                {selectedSyllabus && selectedResourceType === 'books' && selectedSyllabus === 'cbse' && (
                    <div className="mt-4">
                        <h5>{selectedSyllabus.toUpperCase()} - {selectedSubject}</h5>
                        <a href={booksLinks[selectedStandard][selectedSubject][selectedSyllabus]} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            Download Book
                        </a>
                    </div>
                )}

                {selectedTerm && selectedResourceType === 'books' && (
                    <div className="mt-4">
                        <h5>{selectedTerm} - {selectedSubject}</h5>
                        <a href={booksLinks[selectedStandard][selectedSubject]["samacheer"][selectedTerm]} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            Download Book
                        </a>
                    </div>
                )}

                {selectedSyllabus && selectedResourceType === 'pdf' && (
                    <div className="mt-4">
                        <h5>{selectedSyllabus.toUpperCase()} - {selectedSubject}</h5>
                        <a href={pdfLinks[selectedSyllabus][selectedStandard][selectedSubject]} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            Download PDF
                        </a>
                    </div>
                )}

                {selectedResourceType === 'videos' && (
                    <div className="mt-4">
                        <h3>Videos</h3>
                        <DropdownButton
                            title={selectedVideo ? videoOptions.find(v => v.url === selectedVideo)?.title : "Select Video"}
                            onSelect={(eventKey) => {
                                const video = videoOptions.find(v => v.id === parseInt(eventKey));
                                if (video) {
                                    handleVideoSelect(video.url);
                                }
                            }}
                            className="mb-2"
                        >
                            {videoOptions.map(video => (
                                <Dropdown.Item eventKey={video.id} key={video.id}>
                                    {video.title}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>
                )}
            </div>
        </section>
    );
};

const ResourceCard = ({ title, imageUrl, description, onSelect, isCentered }) => (
    <Card className="animate-card" style={{ width: '100%' }}>
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body className={isCentered ? "text-center" : ""}>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Button variant="primary" onClick={onSelect}>Explore</Button>
        </Card.Body>
    </Card>
);

export default Resources;